import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/Toast'
import { ShieldIcon, MailIcon, UserIcon } from '../components/Icons'
import useAuthStore from '../auth/store'
import { getCurrentUser } from '../services/AuthService'

export default function UserHome() {
  const navigate = useNavigate()
  const toast = useToast()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const updateUser = useAuthStore((s) => s.updateUser)
  const [activeTab, setActiveTab] = useState('overview')
  const [showProfile, setShowProfile] = useState(false)
  const [fetchingUser, setFetchingUser] = useState(false)
  const [fetchedUserData, setFetchedUserData] = useState(null)
  const [showUserInfo, setShowUserInfo] = useState(false)

  const displayName = user?.name || user?.email?.split('@')[0] || 'User'
  const displayEmail = user?.email || ''
  const initials = displayName.charAt(0).toUpperCase()
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const handleGetCurrentUser = async () => {
    if (!displayEmail) {
      toast('No email found for current user', 'error')
      return
    }
    setFetchingUser(true)
    try {
      const res = await getCurrentUser(displayEmail)
      setFetchedUserData(res)
      updateUser(res)
      setShowUserInfo(true)
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch user data'
      toast(msg, 'error')
    } finally {
      setFetchingUser(false)
    }
  }

  const handleLogout = () => {
    toast('Logged out successfully', 'success')
    logout()
    navigate('/')
  }

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }


  const stats = [
    { label: 'Projects', value: '12', icon: '📁', trend: '+3 this week', color: '#6c5ce7' },
    { label: 'Tasks Done', value: '48', icon: '✅', trend: '87% rate', color: '#00b894' },
    { label: 'Messages', value: '7', icon: '💬', trend: '3 unread', color: '#0984e3' },
    { label: 'Streak', value: '14', icon: '🔥', trend: 'days active', color: '#e17055' },
  ]

  const recentActivity = [
    { action: 'Completed project setup', time: '2 minutes ago', type: 'success' },
    { action: 'Updated profile settings', time: '1 hour ago', type: 'info' },
    { action: 'Joined Team Alpha workspace', time: '3 hours ago', type: 'info' },
    { action: 'Deployed v2.1.0 to production', time: 'Yesterday', type: 'success' },
    { action: 'Reviewed pull request #42', time: 'Yesterday', type: 'info' },
  ]

  const quickActions = [
    { label: 'New Project', icon: '🚀', desc: 'Start a fresh project' },
    { label: 'Invite Team', icon: '👥', desc: 'Collaborate with others' },
    { label: 'View Reports', icon: '📊', desc: 'Analytics & insights' },
    { label: 'Settings', icon: '⚙️', desc: 'Manage your account' },
  ]

  const progressItems = [
    { name: 'AuthFlow Dashboard', progress: 78, color: '#6c5ce7' },
    { name: 'API Integration', progress: 92, color: '#00b894' },
    { name: 'Mobile App Design', progress: 45, color: '#0984e3' },
    { name: 'Documentation', progress: 60, color: '#e17055' },
  ]

  const profileDetails = [
    { label: 'Full Name', value: displayName, icon: '👤' },
    { label: 'Email', value: displayEmail, icon: '📧' },
    { label: 'Role', value: user?.role || 'Developer', icon: '💼' },
    { label: 'Member Since', value: memberSince, icon: '📅' },
    { label: 'Status', value: 'Active', icon: '🟢' },
    { label: 'Timezone', value: Intl.DateTimeFormat().resolvedOptions().timeZone, icon: '🌍' },
  ]

  return (
    <div className="user-home">
      {/* Top Navigation */}
      <header className="uh-header">
        <div className="uh-header-inner">
          <div className="uh-brand" onClick={() => navigate('/')}>
            <div className="uh-logo"><ShieldIcon /></div>
            <span className="uh-brand-name">AuthFlow</span>
          </div>

          <nav className="uh-nav">
            {['overview', 'projects', 'messages'].map((tab) => (
              <button
                key={tab}
                id={`nav-${tab}`}
                className={`uh-nav-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => { setActiveTab(tab); setShowProfile(false) }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>

          <div className="uh-header-right">
            <button className="uh-notification" id="notifications-btn" aria-label="Notifications">
              <span className="notif-icon">🔔</span>
              <span className="notif-badge">3</span>
            </button>
            <div className="uh-user-menu">
              <div
                className="uh-avatar-small"
                onClick={() => setShowProfile(!showProfile)}
                style={{ cursor: 'pointer' }}
                title="View Profile"
              >
                {initials}
              </div>
              <span
                className="uh-user-name"
                onClick={() => setShowProfile(!showProfile)}
                style={{ cursor: 'pointer' }}
              >
                {displayName}
              </span>
              <button id="logout-btn" className="uh-logout-btn" onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="uh-main">
        {/* Welcome Section */}
        <section className="uh-welcome">
          <div className="uh-welcome-text">
            <span className="uh-greeting-badge">
              <span className="uh-greeting-dot" />
              {greeting()}
            </span>
            <h1>Welcome back, <span className="uh-name-gradient">{displayName}</span></h1>
            <p>Here's what's happening with your projects today.</p>
          </div>
          <div className="uh-welcome-visual">
            <div className="uh-date-card">
              <span className="uh-date-day">{new Date().getDate()}</span>
              <span className="uh-date-month">{new Date().toLocaleString('default', { month: 'short' })}</span>
              <span className="uh-date-year">{new Date().getFullYear()}</span>
            </div>
          </div>
        </section>

        {/* ===== Profile Overlay ===== */}
        {showProfile && (
          <section className="profile-overlay" onClick={() => setShowProfile(false)}>
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
              <button className="profile-close" onClick={() => setShowProfile(false)} aria-label="Close profile">✕</button>

              {/* Profile Header */}
              <div className="profile-hero">
                <div className="profile-avatar-lg">
                  {initials}
                </div>
                <h2 className="profile-name-lg">{displayName}</h2>
                <p className="profile-email-lg">{displayEmail}</p>
                <div className="profile-status-badge">
                  <span className="status-dot" />
                  Online
                </div>
              </div>

              {/* Profile Stats Row */}
              <div className="profile-stats-row">
                <div className="profile-stat-item">
                  <span className="profile-stat-val">12</span>
                  <span className="profile-stat-lbl">Projects</span>
                </div>
                <div className="profile-stat-divider" />
                <div className="profile-stat-item">
                  <span className="profile-stat-val">48</span>
                  <span className="profile-stat-lbl">Tasks</span>
                </div>
                <div className="profile-stat-divider" />
                <div className="profile-stat-item">
                  <span className="profile-stat-val">14</span>
                  <span className="profile-stat-lbl">Day Streak</span>
                </div>
              </div>

              {/* Profile Details */}
              <div className="profile-details">
                {profileDetails.map((item, i) => (
                  <div className="profile-detail-row" key={i}>
                    <span className="profile-detail-icon">{item.icon}</span>
                    <div className="profile-detail-info">
                      <span className="profile-detail-label">{item.label}</span>
                      <span className="profile-detail-value">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Profile Actions */}
              <div className="profile-actions">
                <button className="profile-btn-edit" onClick={() => setShowProfile(false)}>
                  Edit Profile
                </button>
                <button className="profile-btn-logout" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Stats Grid */}
        <section className="uh-stats">
          {stats.map((stat, i) => (
            <div className="uh-stat-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="uh-stat-icon" style={{ background: `${stat.color}20` }}>
                {stat.icon}
              </div>
              <div className="uh-stat-info">
                <span className="uh-stat-value">{stat.value}</span>
                <span className="uh-stat-label">{stat.label}</span>
              </div>
              <span className="uh-stat-trend">{stat.trend}</span>
            </div>
          ))}
        </section>

        {/* Content Grid */}
        <div className="uh-content-grid">
          {/* Quick Actions */}
          <section className="uh-panel uh-quick-actions">
            <h2 className="uh-panel-title">Quick Actions</h2>
            <div className="uh-actions-grid">
              {quickActions.map((action, i) => (
                <button className="uh-action-card" key={i}>
                  <span className="uh-action-icon">{action.icon}</span>
                  <span className="uh-action-label">{action.label}</span>
                  <span className="uh-action-desc">{action.desc}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Project Progress */}
          <section className="uh-panel uh-progress-panel">
            <h2 className="uh-panel-title">Project Progress</h2>
            <div className="uh-progress-list">
              {progressItems.map((item, i) => (
                <div className="uh-progress-item" key={i}>
                  <div className="uh-progress-header">
                    <span className="uh-progress-name">{item.name}</span>
                    <span className="uh-progress-pct" style={{ color: item.color }}>{item.progress}%</span>
                  </div>
                  <div className="uh-progress-track">
                    <div
                      className="uh-progress-fill"
                      style={{
                        width: `${item.progress}%`,
                        background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="uh-panel uh-activity">
            <h2 className="uh-panel-title">Recent Activity</h2>
            <div className="uh-activity-list">
              {recentActivity.map((item, i) => (
                <div className="uh-activity-item" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className={`uh-activity-dot ${item.type}`} />
                  <div className="uh-activity-content">
                    <span className="uh-activity-action">{item.action}</span>
                    <span className="uh-activity-time">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Profile Card (sidebar) */}
          <section
            className="uh-panel uh-profile-card"
            onClick={() => setShowProfile(true)}
            style={{ cursor: 'pointer' }}
            title="Click for full profile"
          >
            <div className="uh-profile-avatar">
              {initials}
            </div>
            <h3 className="uh-profile-name">{displayName}</h3>
            <p className="uh-profile-email">{displayEmail}</p>
            <div className="uh-profile-stats">
              <div className="uh-profile-stat">
                <span className="uh-ps-value">12</span>
                <span className="uh-ps-label">Projects</span>
              </div>
              <div className="uh-profile-stat-divider" />
              <div className="uh-profile-stat">
                <span className="uh-ps-value">48</span>
                <span className="uh-ps-label">Tasks</span>
              </div>
              <div className="uh-profile-stat-divider" />
              <div className="uh-profile-stat">
                <span className="uh-ps-value">14</span>
                <span className="uh-ps-label">Days</span>
              </div>
            </div>
            <button className="uh-edit-profile-btn" onClick={(e) => { e.stopPropagation(); setShowProfile(true) }}>
              View Profile
            </button>
          </section>
        </div>
      </main>

      {/* ===== Current User Info Modal ===== */}
      {showUserInfo && fetchedUserData && (
        <section className="profile-overlay" onClick={() => setShowUserInfo(false)}>
          <div className="profile-modal current-user-modal" onClick={(e) => e.stopPropagation()}>
            <button className="profile-close" onClick={() => setShowUserInfo(false)} aria-label="Close">✕</button>

            {/* Header */}
            <div className="profile-hero">
              <div className="profile-avatar-lg">
                {(fetchedUserData.name || fetchedUserData.email || 'U').charAt(0).toUpperCase()}
              </div>
              <h2 className="profile-name-lg">Current User Info</h2>
              <p className="profile-email-lg">Fetched from server</p>
              <div className="profile-status-badge">
                <span className="status-dot" />
                Live Data
              </div>
            </div>

            {/* User Data Rows */}
            <div className="profile-details">
              {Object.entries(fetchedUserData).map(([key, value]) => {
                // Skip long/complex values or sensitive keys
                if (key === 'password' || key === '__v') return null
                const displayValue = typeof value === 'object' && value !== null
                  ? JSON.stringify(value)
                  : String(value ?? '—')
                return (
                  <div className="profile-detail-row" key={key}>
                    <span className="profile-detail-icon">📋</span>
                    <div className="profile-detail-info">
                      <span className="profile-detail-label">{key}</span>
                      <span className="profile-detail-value" title={displayValue}>{displayValue}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Actions */}
            <div className="profile-actions">
              <button className="profile-btn-edit" onClick={() => setShowUserInfo(false)}>
                Close
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="uh-footer">
        <div className="uh-footer-inner">
          <p className="uh-footer-copy">© 2026 AuthFlow. All rights reserved.</p>
          <button
            id="get-current-user-btn"
            className="uh-get-user-btn"
            onClick={handleGetCurrentUser}
            disabled={fetchingUser}
          >
            {fetchingUser ? <span className="spinner" /> : '🔄  Get Current User'}
          </button>
        </div>
      </footer>
    </div>
  )
}
