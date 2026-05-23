import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuthStore from '../auth/store'
import { refreshToken } from '../services/AuthService'

function OAuthSuccess() {

    const navigate = useNavigate();

    const login =
        useAuthStore(
            state => state.login
        );

    const [isRefreshing, setIsRefreshing] =
        useState(false);

    useEffect(() => {

        async function getAccessToken() {

            if (isRefreshing) return;

            setIsRefreshing(true);

            try {

                const res =
                    await refreshToken();



                // Save auth data in Zustand
                login({

                    accessToken:
                        res.accessToken,

                    user:
                        res.user,
                });

                // Redirect user
                navigate(
                    "/user-home"
                );

            } catch (error) {

                console.log(error);

                navigate(
                    "/login"
                );

            } finally {

                setIsRefreshing(false);
            }
        }

        getAccessToken();

    }, []);

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col items-center justify-center px-4">

            {/* Card */}
            <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center border border-gray-100">

                {/* Spinner */}
                <div className="flex justify-center mb-6">

                    <div className="relative">

                        <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>

                        <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>

                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-3">

                    Completing Login

                </h1>

                {/* Subtitle */}
                <p className="text-gray-500 leading-relaxed">

                    Please wait while we securely
                    complete your OAuth authentication.

                </p>

                {/* Small status */}
                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-blue-600 font-medium">

                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>

                    Authenticating your account...

                </div>

            </div>

        </div>
    );
}

export default OAuthSuccess;