import { useNavigate } from 'react-router-dom'
import { ShieldIcon } from '../components/Icons'
import useAuthStore from '../auth/store'

export default function HomePage() {
  const navigate = useNavigate()
  const authStatus = useAuthStore((s) => s.authStatus)
  const user = useAuthStore((s) => s.user)

  return (
    <div className="home-page">
      {/* ===== Header ===== */}
      <header className="home-header">
        <div className="header-inner">
          <div className="header-brand" onClick={() => navigate('/')}>
            <div className="header-logo">
              <ShieldIcon />
            </div>
            <span className="header-name">AuthFlow</span>
          </div>
          <nav className="header-nav">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
          </nav>
          <div className="header-actions">
            {authStatus ? (
              <>
                <button
                  id="header-dashboard-btn"
                  className="btn-header btn-header-fill"
                  onClick={() => navigate('/user-home')}
                >
                  Dashboard →
                </button>
              </>
            ) : (
              <>
                <button
                  id="header-login-btn"
                  className="btn-header btn-header-outline"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </button>
                <button
                  id="header-register-btn"
                  className="btn-header btn-header-fill"
                  onClick={() => navigate('/register')}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ===== Hero Section ===== */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Trusted by 50,000+ developers
          </div>
          <h1 className="hero-title">
            Secure Your App with
            <span className="hero-gradient"> Next-Gen Auth</span>
          </h1>
          <p className="hero-subtitle">
            Beautiful, animated, and production-ready authentication flows.
            Built with modern design principles for seamless user experiences.
          </p>
          <div className="hero-buttons">
            <button
              id="hero-get-started-btn"
              className="btn-hero btn-hero-primary"
              onClick={() => navigate(authStatus ? '/user-home' : '/register')}
            >
              {authStatus ? 'Go to Dashboard' : 'Get Started Free'}
              <span className="btn-arrow">→</span>
            </button>
            <button
              id="hero-learn-more-btn"
              className="btn-hero btn-hero-ghost"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Learn More
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Users</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">&lt;100ms</span>
              <span className="stat-label">Response</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card-stack">
            <div className="hero-mock-card mock-back" />
            <div className="hero-mock-card mock-mid" />
            <div className="hero-mock-card mock-front">
              <div className="mock-header">
                <div className="mock-dots">
                  <span /><span /><span />
                </div>
              </div>
              <div className="mock-body">
                <div className="mock-avatar-ring">
                  <div className="mock-avatar">✦</div>
                </div>
                <div className="mock-line w60" />
                <div className="mock-line w80" />
                <div className="mock-line w40" />
                <div className="mock-btn-placeholder" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section className="features" id="features">
        <div className="section-header">
          <span className="section-tag">Features</span>
          <h2 className="section-title">Everything You Need</h2>
          <p className="section-desc">
            A complete authentication solution crafted with care and modern design.
          </p>
        </div>
        <div className="features-grid">
          {[
            { icon: '🔐', title: 'End-to-End Encryption', desc: 'Military-grade encryption protects every credential with zero-knowledge architecture.' },
            { icon: '⚡', title: 'Lightning Fast', desc: 'Sub-100ms authentication responses powered by edge computing infrastructure.' },
            { icon: '🎨', title: 'Beautiful UI', desc: 'Glassmorphism design with smooth animations that your users will love.' },
            { icon: '🛡️', title: 'Brute Force Protection', desc: 'Intelligent rate limiting and CAPTCHA challenges keep your app safe.' },
            { icon: '📱', title: 'Fully Responsive', desc: 'Perfect experience across every device — desktop, tablet, and mobile.' },
            { icon: '🔗', title: 'Social Login', desc: 'One-click login with Google, GitHub, Apple, and more providers.' },
          ].map((f, i) => (
            <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <span className="section-tag">How It Works</span>
          <h2 className="section-title">Three Simple Steps</h2>
          <p className="section-desc">Get your authentication up and running in minutes.</p>
        </div>
        <div className="steps-row">
          {[
            { num: '01', title: 'Create Account', desc: 'Sign up with your email or use social login for instant access.' },
            { num: '02', title: 'Verify Identity', desc: 'Quick email verification to ensure account security.' },
            { num: '03', title: 'You\'re In!', desc: 'Access your personalized dashboard and start building.' },
          ].map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < 2 && <div className="step-connector" />}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta-section">
        <div className="cta-card">
          <h2>{authStatus ? `Welcome back, ${user?.name || 'User'}!` : 'Ready to Get Started?'}</h2>
          <p>{authStatus
            ? 'Head to your dashboard to manage projects and see updates.'
            : 'Join thousands of developers building secure applications today.'}
          </p>
          <button
            id="cta-register-btn"
            className="btn-hero btn-hero-primary"
            onClick={() => navigate(authStatus ? '/user-home' : '/register')}
          >
            {authStatus ? 'Go to Dashboard' : 'Create Free Account'}
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="home-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="header-logo small">
              <ShieldIcon />
            </div>
            <span>AuthFlow</span>
          </div>
          <p className="footer-copy">© 2026 AuthFlow. Built with ❤️ for developers.</p>
        </div>
      </footer>
    </div>
  )
}
