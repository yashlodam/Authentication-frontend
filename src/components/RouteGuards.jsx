import { Navigate } from 'react-router-dom'
import useAuthStore from '../auth/store'

// Blocks unauthenticated users → redirects to /login
export function ProtectedRoute({ children }) {
  const authStatus = useAuthStore((s) => s.authStatus)
  if (!authStatus) {
    return <Navigate to="/login" replace />
  }
  return children
}

// Blocks authenticated users → redirects to /user-home
export function PublicRoute({ children }) {
  const authStatus = useAuthStore((s) => s.authStatus)
  if (authStatus) {
    return <Navigate to="/user-home" replace />
  }
  return children
}
