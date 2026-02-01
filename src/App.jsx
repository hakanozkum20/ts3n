import { useState } from 'react'
import Login from './Login'
import TokenPanel from './TokenPanel'
import './App.css'

function App() {
  const [authenticated, setAuthenticated] = useState(false)

  if (!authenticated) {
    return <Login onLogin={() => setAuthenticated(true)} />
  }

  return (
    <div className="app">
      <TokenPanel onLogout={() => setAuthenticated(false)} />
    </div>
  )
}

export default App
