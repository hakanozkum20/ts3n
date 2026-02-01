import { useState } from 'react'
import { addToken } from './api'

function TokenPanel({ onLogout }) {
  const [tokenKey, setTokenKey] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddToken = async () => {
    if (!tokenKey.trim()) {
      setMessage('Enter a token key!')
      return
    }

    setMessage('')
    setLoading(true)

    try {
      const data = await addToken(tokenKey)
      if (data.success) {
        setMessage('Token added successfully!')
        setTokenKey('')
        setConfirmPassword('')
      } else {
        setMessage('Error: ' + data.error)
      }
    } catch (err) {
      setMessage('Connection error!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <h1>TS3 Admin Panel</h1>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>

      <div className="card">
        <h2>Server Admin Query Ekle</h2>
        <input
          type="text"
          placeholder="Token key"
          value={tokenKey}
          onChange={(e) => setTokenKey(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={handleAddToken}
          disabled={loading || !confirmPassword}
          className="add-btn"
        >
          {loading ? '...' : 'Add Token'}
        </button>
        {message && <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</div>}
      </div>
    </div>
  )
}

export default TokenPanel
