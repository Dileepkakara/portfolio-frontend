import { useState } from 'react'
import { API_BASE_URL } from '../config/api'

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@dileep.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [isRegister, setIsRegister] = useState(true) // Default to Register mode

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      if (!response.ok) throw new Error('Login failed')
      
      const data = await response.json()
      localStorage.setItem('adminToken', data.token)
      onLoginSuccess()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Registration failed')
      }
      
      const data = await response.json()
      localStorage.setItem('adminToken', data.token)
      onLoginSuccess()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isRegister) {
      await handleRegister(e)
    } else {
      await handleLogin(e)
    }
  }

  return (
    <div className="admin-login-overlay">
      <div className="admin-login-box">
        <h2>{isRegister ? 'Admin Register' : 'Admin Login'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {isRegister ? 'Register' : 'Login'}
          </button>
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={() => {
              setIsRegister(!isRegister)
              setError('')
            }}
          >
            {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
