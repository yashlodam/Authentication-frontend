import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/Toast'

export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate()
  const toast = useToast()

  const handleLogout = () => {
    toast('Logged out successfully', 'success')
    onLogout()
    navigate('/')
  }

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2>Welcome, {user.name}!</h2>
        <p>{user.email}</p>
        <button id="logout-btn" className="btn-logout" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
