import apiClient from "../config/ApiClient";

// ─── API Base URL (without /api/v1 for OAuth redirects) ───
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

// Register a new user
const registerUser = async (userData) => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
};

// Login an existing user
const loginUser = async (userData) => {
    const response = await apiClient.post("/auth/login", userData);
    return response.data;
};

//get current login user

export const getCurrentUser = async (emailId) => {
    const response = await apiClient.get(`/users/email/${emailId}`);
    return response.data;
};

//refresh token 

export const refreshToken = async () => {
    const response = await apiClient.post('/auth/refresh');
    return response.data;
}

// ─── OAuth Social Login ───────────────────────────────────────────────────────

const loginWithGoogle = () => {
    const redirectUri = encodeURIComponent(getOAuthCallbackUrl());
    window.location.href = `${API_BASE}/auth/google?redirect_uri=${redirectUri}`;
};
const loginWithGithub = () => {
    const redirectUri = encodeURIComponent(getOAuthCallbackUrl());
    window.location.href = `${API_BASE}/auth/github?redirect_uri=${redirectUri}`;
};

/**
 * Build the frontend callback URL where the backend will redirect after OAuth.
 * Can be configured via VITE_OAUTH_REDIRECT_URL env variable.
 */
const getOAuthCallbackUrl = () => {
    return `${window.location.origin}/auth/callback`;
};

export { registerUser, loginUser, loginWithGoogle, loginWithGithub };