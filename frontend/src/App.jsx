import { useState, useEffect } from 'react'

function App() {
  const [tokens, setTokens] = useState([])
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [status, setStatus] = useState('Loading tokens...')

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/VultiGuard/vultiguard-thor-swaps/main/tokenlist.json')
      .then(r => r.json())
      .then(data => {
        setTokens(data.tokens || [])
        setStatus('Ready')
        if (data.tokens?.length) {
          setFrom(data.tokens[0].symbol)
          setTo(data.tokens[1]?.symbol || '')
        }
      })
      .catch(e => setStatus('Error: ' + e))
  }, [])

  const performSwap = async () => {
    setStatus('Swapping ' + from + ' → ' + to + '...')
    setTimeout(() => setStatus('Swap initiated! (Demo - Connect wallet)'), 2000)
  }

  return (
    <div className="App">
      <h1>🛡️ VultiGuard</h1>
      <p>THORChain Native L1 Swap Wallet PP </p>
      <div className="swap-form">
        <select value={from} onChange={e => setFrom(e.target.value)}>
          {tokens.map(t => (
            <option key={t.symbol}>{t.name} ({t.symbol})</option>
          ))}
        </select>
        <select value={to} onChange={e => setTo(e.target.value)}>
          {tokens.map(t => (
            <option key={t.symbol}>{t.name} ({t.symbol})</option>
          ))}
        </select>
        <button onClick={performSwap}>Swap</button>
      </div>
      <div className="status">{status}</div>
    </div>
  )
}

export default App
