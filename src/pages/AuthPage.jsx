import { useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToast } from '../components/Toast'
import {
  MailIcon, LockIcon, UserIcon,
  EyeIcon, EyeOffIcon,
  GoogleIcon, GithubIcon, ShieldIcon,
} from '../components/Icons'

function getStrength(pw) {
  let s = 0
  if (pw.length >= 6) s++
  if (pw.length >= 10) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  if (s <= 2) return { level: 'weak', score: s, label: 'Weak' }
  if (s <= 3) return { level: 'medium', score: s, label: 'Medium' }
  return { level: 'strong', score: s, label: 'Strong' }
}

export default function AuthPage({ onAuth }) {
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()

  const [tab, setTab] = useState(location.state?.tab || 'login')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [showCpw, setShowCpw] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', remember: false,
  })

  const set = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((f) => ({ ...f, [key]: val }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const validate = useCallback(() => {
    const errs = {}
    if (tab === 'register' && !form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Min 6 characters'
    if (tab === 'register') {
      if (!form.confirmPassword) errs.confirmPassword = 'Confirm your password'
      else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords don\'t match'
    }
    return errs
  }, [tab, form])

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast(
        tab === 'login' ? 'Welcome back!' : 'Account created successfully!',
        'success'
      )
      onAuth({ name: form.name || form.email.split('@')[0], email: form.email })
      navigate('/dashboard')
    }, 1500)
  }

  const strength = getStrength(form.password)

  return (
    <div className="auth-layout">
      <div className="glass-card" key={tab}>
        {/* Brand */}
        <div className="brand">
          <div className="brand-icon"><ShieldIcon /></div>
          <h1>AuthFlow</h1>
          <p>{tab === 'login' ? 'Welcome back! Sign in to continue' : 'Create your account to get started'}</p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            id="tab-login"
            className={tab === 'login' ? 'active' : ''}
            onClick={() => { setTab('login'); setErrors({}) }}
          >Login</button>
          <button
            id="tab-register"
            className={tab === 'register' ? 'active' : ''}
            onClick={() => { setTab('register'); setErrors({}) }}
          >Register</button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {tab === 'register' && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={set('name')}
                />
                <span className="icon"><UserIcon /></span>
              </div>
              {errors.name && <div className="field-error">{errors.name}</div>}
            </div>
          )}

          <div className="form-group">
        ī   <label htmlFor="email">Email Address</label>
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

          <div classīName="form-group">
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
            {tab === 'register' && form.password && (
              <div className="password-strength">
                <div className="strength-bars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`strength-bar ${i <= strength.score ? `active ${strength.level}` : ''}`} />
                  ))}
                </div>
                <div className={`strength-text ${strength.level}`}>{strength.label}</div>
              </div>
            )}
          </div>

          {tab === 'register' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <input
                  id="confirmPassword"
                  type={showCpw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={set('confirmPassword')}
                />
                <span className="icon"><LockIcon /></span>
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowCpw(!showCpw)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showCpw ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}
            </div>
          )}

          {tab === 'login' && (
            <div className="form-options">
              <label className="checkbox-group">
                <input type="checkbox" checked={form.remember} onChange={set('remember')} />
                <span>Remember me</span>
              </label>
              <button type="button" className="link">Forgot password?</button>
            </div>
          )}

          <button id="auth-submit-btn" type="submit" className="btn-submit" disabled={loading}>
            {loading ? <span className="spinner" /> : tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <div className="divider">or continue with</div>

          <div className="social-buttons">
            <button type="button" className="btn-social" id="google-login-btn">
              <GoogleIcon /> Google
            </button>
            <button type="button" className="btn-social" id="github-login-btn">
              <GithubIcon /> GitHub
            </button>
          </div>
        </form>

        <div className="auth-footer">
          {tab === 'login' ? (
            <span>Don't have an account?{' '}
              <button className="link" onClick={() => { setTab('register'); setErrors({}) }}>Sign up</button>
            </span>
          ) : (
            <span>Already have an account?{' '}
              <button className="link" onClick={() => { setTab('login'); setErrors({}) }}>Sign in</button>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
