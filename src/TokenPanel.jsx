import { useState } from 'react'
import { addToken } from './api'
import './TokenPanel.css'

function TokenPanel({ onLogout }) {
  const [tokenKey, setTokenKey] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAddToken = async () => {
    if (!tokenKey.trim()) {
      setMessage('Please enter a token key!')
      return
    }

    setMessage('')
    setLoading(true)

    try {
      const data = await addToken(tokenKey)
      if (data.success) {
        setMessage('Token added successfully!')
        setTokenKey('')
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
    <div className="token-page">
      <div className="token-background" />
      <div className="token-container">
        {/* Header */}
        <header className="token-header">
          <div className="header-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="7" fill="currentColor"/>
              <path d="M14 6L18 10L16 12L14 10L12 12L10 10L14 6Z" fill="white" opacity="0.9"/>
              <path d="M9 14H19V16H9V14Z" fill="white" opacity="0.9"/>
              <path d="M9 18H19V20H9V18Z" fill="white" opacity="0.9"/>
            </svg>
            <span>TS3 Admin</span>
          </div>
          <button onClick={onLogout} className="logout-button">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M6 9H16M16 9L13 6M16 9L13 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 4H13C13.7956 4 14.5587 4.31607 15.1213 4.87868C15.6839 5.44129 16 6.20435 16 7V11C16 11.7956 15.6839 12.5587 15.1213 13.1213C14.5587 13.6839 13.7956 14 13 14H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </button>
        </header>

        {/* Main Card */}
        <div className="token-card">
          <div className="card-header">
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 6V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h1>Add Server Token</h1>
              <p>Create a new admin query token for your TeamSpeak server</p>
            </div>
          </div>

          <div className="card-body">
            <div className="input-group">
              <label htmlFor="tokenKey">Token Key</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                  <path d="M10 5V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  id="tokenKey"
                  type="text"
                  placeholder="Enter your token key"
                  value={tokenKey}
                  onChange={(e) => setTokenKey(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddToken()}
                  autoFocus
                />
              </div>
            </div>

            {message && (
              <div className={`alert ${message.includes('Error') || message.includes('enter') ? 'alert-error' : 'alert-success'}`}>
                {message.includes('Error') || message.includes('enter') ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M9 6V9M9 12V12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M15 9C15 12.3137 12.3137 15 9 15C5.68629 15 3 12.3137 3 9C3 5.68629 5.68629 3 9 3C12.3137 3 15 5.68629 15 9Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M6 9L8 11L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                {message}
              </div>
            )}

            <button
              onClick={handleAddToken}
              disabled={loading || !tokenKey.trim()}
              className="add-button"
            >
              {loading ? (
                <span className="spinner">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                    <path d="M10 2C10 2 10 10 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
              ) : (
                <>
                  Add Token
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>

          <div className="card-footer">
            <div className="footer-info">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                <path d="M8 5V8M8 11V11.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span>The token will be added to your TeamSpeak server with admin privileges</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenPanel
