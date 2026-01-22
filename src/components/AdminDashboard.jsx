import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminPanel from './admin/AdminPanel'

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('adminToken'))

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />
  }

  const token = localStorage.getItem('adminToken')

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>⚙️ Admin Dashboard</h1>
        <button onClick={handleLogout} className="btn-logout">🚪 Logout</button>
      </div>

      <AdminPanel token={token} />
    </div>
  )
}

export default AdminDashboard
