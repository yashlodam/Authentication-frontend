import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/Toast'
import { registerUser, loginWithGoogle, loginWithGithub } from '../services/AuthService'
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

export default function RegisterPage() {
  const navigate = useNavigate()
  const toast = useToast()

  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState({})

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const validate = useCallback(() => {
    const errs = {}
    if (!data.name.trim()) errs.name = 'Name is required'
    if (!data.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(data.email)) errs.email = 'Invalid email'
    if (!data.password) errs.password = 'Password is required'
    else if (data.password.length < 6) errs.password = 'Min 6 characters'
    return errs
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await registerUser(data)
      toast('Account created successfully! Please sign in.', 'success')
      setData({ name: '', email: '', password: '' })
      navigate('/login')
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Try again.'
      toast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  const strength = getStrength(data.password)

  return (
    <div className="auth-layout">
      <div className="glass-card">
        {/* Brand */}
        <div className="brand">
          <div className="brand-icon"><ShieldIcon /></div>
          <h1>AuthFlow</h1>
          <p>Create your account to get started</p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            id="tab-login"
            onClick={() => navigate('/login')}
          >Login</button>
          <button id="tab-register" className="active">Register</button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <span className="icon"><UserIcon /></span>
            </div>
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
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
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
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
            {data.password && (
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

          <button id="auth-submit-btn" type="submit" className="btn-submit" disabled={loading}>
            {loading ? <span className="spinner" /> : 'Create Account'}
          </button>

          <div className="divider">or continue with</div>

          <div className="social-buttons">
            <button type="button" className="btn-social" id="google-login-btn" onClick={loginWithGoogle}>
              <GoogleIcon /> Google
            </button>
            <button type="button" className="btn-social" id="github-login-btn" onClick={loginWithGithub}>
              <GithubIcon /> GitHub
            </button>
          </div>
        </form>

        <div className="auth-footer">
          <span>Already have an account?{' '}
            <button className="link" onClick={() => navigate('/login')}>Sign in</button>
          </span>
        </div>
      </div>
    </div>
  )
}
