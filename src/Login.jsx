import { useState } from 'react'
import { login } from './api'
import './Login.css'

function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await login(password)
      if (data.success) {
        onLogin()
      } else {
        setError('Wrong password!')
      }
    } catch (err) {
      setError('Connection error!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-background" />
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="currentColor"/>
              <path d="M16 8L20 12L18 14L16 12L14 14L12 12L16 8Z" fill="white" opacity="0.9"/>
              <path d="M11 16H21V18H11V16Z" fill="white" opacity="0.9"/>
              <path d="M11 20H21V22H11V20Z" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <h1>Admin Panel</h1>
          <p className="login-subtitle">Sign in to access your dashboard</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className={error ? 'input-error' : ''}
              />
              <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          {error && (
            <div className="error-message">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 5V8M8 11V11.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading || !password} className="login-button">
            {loading ? (
              <span className="loading-spinner">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                  <path d="M10 2C10 2 10 10 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            ) : (
              <>
                Sign In
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L10 5M13 8L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Protected by authentication</p>
        </div>
      </div>
    </div>
  )
}

export default Login
