import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './components/Toast'
import { ProtectedRoute, PublicRoute } from './components/RouteGuards'
import AnimatedBackground from './components/AnimatedBackground'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserHome from './pages/UserHome'
import OAuthCallback from './pages/OAuthCallback'
import OAuthSucess from './pages/OAuthSucess'
import OAuthError from './pages/OAuthError'

export default function App() {
  return (
    <ToastProvider>
      <AnimatedBackground />
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />

        {/* Auth pages — redirect to /user-home if already logged in */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/success"
          element={<OAuthSucess />}
        />
        <Route
          path="/error"
          element={<OAuthError />}
        />

        <Route path="/auth/callback" element={<OAuthCallback />} />

        {/* Protected pages — redirect to /login if not logged in */}
        <Route
          path="/user-home"
          element={
            <ProtectedRoute>
              <UserHome />
            </ProtectedRoute>
          }
        />

        {/* Redirects */}
        <Route path="/auth" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<Navigate to="/user-home" replace />} />

        {/* Catch-all → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  )
}
