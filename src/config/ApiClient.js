import axios from "axios";
import useAuthStore from "../auth/store";
import { refreshToken } from "../services/AuthService";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1",

    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 10000,
});

apiClient.interceptors.request.use(

    (config) => {

        const token =
            useAuthStore.getState()
                .accessToken;

        if (
            token &&
            typeof token === "string" &&
            token.includes(".") &&
            !config.url?.includes("/auth/refresh")
        ) {

            config.headers =
                config.headers || {};

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    }
);

let isRefreshing = false;
let pending = [];

function queueRequest(cb) {
    pending.push(cb);
}

function resolvedQueue(newToken) {
    pending.forEach(cb => cb(newToken));
    pending = [];
}

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Attach the Bearer token to every outgoing request
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log(error)
        const is401 = error.response.status === 401;
        const original = error.config;
        if (!is401 || original._retry) {
            return Promise.reject(error);
        }

        //we will try to refresh the token:

        if (isRefreshing) {
            console.log("already refreshing")
            return new Promise((resolve, reject) => {
                queueRequest((newToken) => {
                    if (!newToken) return reject();
                    original.headers.Authorization = `Bearer ${newToken}`;
                    resolve(apiClient(original));
                });
            });
        }
        //start refresh
        original._retry = true;
        isRefreshing = true;
        try {
            console.log("start refreshing...")
            const LoginResponse = await refreshToken();

            const newToken =
                LoginResponse.accessToken ||
                LoginResponse.token;
            if (!newToken) throw new Error("no acess token received");
            resolvedQueue(newToken);
            useAuthStore.getState().login({ accessToken: newToken, user: useAuthStore.getState().user })
            original.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(original);
        } catch (refreshError) {

            console.log(
                "REFRESH ERROR:",
                refreshError
            );

            console.log(
                "REFRESH STATUS:",
                refreshError.response?.status
            );

            console.log(
                "REFRESH DATA:",
                refreshError.response?.data
            );

            resolvedQueue(null);

            useAuthStore.getState().logout();

            throw refreshError;
        } finally {
            isRefreshing = false;
        }
    }
);





export default apiClient;
