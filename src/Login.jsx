import { useState } from 'react'
import { login } from './api'

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
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Admin Panel</h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? '...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
