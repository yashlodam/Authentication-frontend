import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useToast } from '../components/Toast'
import useAuthStore from '../auth/store'
import { ShieldIcon } from '../components/Icons'

/**
 * OAuth Callback Page
 *
 * After the backend completes the OAuth flow with Google/GitHub, it redirects
 * the browser to this page with token and user info in the query string:
 *
 *   /auth/callback?token=xxx&name=John&email=john@example.com
 *
 * This page extracts those params, stores them in the auth store, and
 * redirects the user to /user-home.
 */
export default function OAuthCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const toast = useToast()
  const login = useAuthStore((s) => s.login)
  const [status, setStatus] = useState('processing') // processing | success | error

  useEffect(() => {
    const token = searchParams.get('token') || searchParams.get('accessToken') || searchParams.get('access_token')
    const error = searchParams.get('error')

    if (error) {
      setStatus('error')
      toast(decodeURIComponent(error) || 'OAuth login failed', 'error')
      setTimeout(() => navigate('/login', { replace: true }), 2000)
      return
    }

    if (!token) {
      setStatus('error')
      toast('No authentication token received', 'error')
      setTimeout(() => navigate('/login', { replace: true }), 2000)
      return
    }

    // Extract user info from query params
    const user = {
      name: searchParams.get('name') || searchParams.get('displayName') || '',
      email: searchParams.get('email') || '',
      avatar: searchParams.get('avatar') || searchParams.get('picture') || '',
      provider: searchParams.get('provider') || 'oauth',
    }

    // If name is empty, derive from email
    if (!user.name && user.email) {
      user.name = user.email.split('@')[0]
    }

    // Store in Zustand + localStorage
    login({ accessToken: token, user })

    setStatus('success')
    toast(`Welcome${user.name ? `, ${user.name}` : ''}!`, 'success')
    setTimeout(() => navigate('/user-home', { replace: true }), 800)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="auth-layout">
      <div className="glass-card" style={{ textAlign: 'center', padding: '60px 40px' }}>
        <div className="brand">
          <div className="brand-icon"><ShieldIcon /></div>
          <h1>AuthFlow</h1>
        </div>

        {status === 'processing' && (
          <div className="oauth-status">
            <div className="oauth-spinner" />
            <p className="oauth-message">Completing sign in...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="oauth-status">
            <div className="oauth-check">✓</div>
            <p className="oauth-message">Successfully authenticated!</p>
            <p className="oauth-sub">Redirecting to dashboard...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="oauth-status">
            <div className="oauth-error-icon">✕</div>
            <p className="oauth-message">Authentication failed</p>
            <p className="oauth-sub">Redirecting to login...</p>
          </div>
        )}
      </div>
    </div>
  )
}
