import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/Toast'
import { loginUser, loginWithGoogle, loginWithGithub } from '../services/AuthService'
import useAuthStore from '../auth/store'
import {
  MailIcon, LockIcon,
  EyeIcon, EyeOffIcon,
  GoogleIcon, GithubIcon, ShieldIcon,
} from '../components/Icons'
import OAuth2Buttons from '../components/OAuth2Buttons'

export default function LoginPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const login = useAuthStore((s) => s.login)

  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    email: '', password: ''
  })

  const set = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const validate = useCallback(() => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Min 6 characters'
    return errs
  }, [form])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await loginUser({ email: form.email, password: form.password })
      // Store auth data in Zustand + localStorage
      login({
        accessToken: res.accessToken || res.token,
        user: res.user || { name: res.name || form.email.split('@')[0], email: form.email },
      })
      toast('Welcome back!', 'success')
      setForm({ email: '', password: '' })
      navigate('/user-home')
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Check your credentials.'
      toast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-layout">
      <div className="glass-card">
        {/* Brand */}
        <div className="brand">
          <div className="brand-icon"><ShieldIcon /></div>
          <h1>AuthFlow</h1>
          <p>Welcome back! Sign in to continue</p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button id="tab-login" className="active">Login</button>
          <button
            id="tab-register"
            onClick={() => navigate('/register')}
          >Register</button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set('email')}
              />
              <span className="icon"><MailIcon /></span>
            </div>
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={set('password')}
              />
              <span className="icon"><LockIcon /></span>
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPw(!showPw)}
                aria-label="Toggle password visibility"
              >
                {showPw ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>

          <div className="form-options">
            <label className="checkbox-group">
              <input type="checkbox" checked={form.remember} onChange={set('remember')} />
              <span>Remember me</span>
            </label>
            <button type="button" className="link">Forgot password?</button>
          </div>

          <button id="auth-submit-btn" type="submit" className="btn-submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Sign In'}
          </button>

          <div className="divider">or continue with</div>

          <OAuth2Buttons />
        </form>

        <div className="auth-footer">
          <span>Don't have an account?{' '}
            <button className="link" onClick={() => navigate('/register')}>Sign up</button>
          </span>
        </div>
      </div>
    </div>
  )
}
