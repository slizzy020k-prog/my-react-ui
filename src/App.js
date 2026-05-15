import { useState, useEffect } from 'react';
import './App.css';

const MOCK_DATA = {
  totalBalance: 12453.82,
  dailyPnL: 342.50,
  monthlyPnL: 2187.30,
  trades: 847,
  winRate: 68.4,
  holdings: [
    { symbol: 'BTC', amount: 0.15, value: 5621.40, change: 2.34 },
    { symbol: 'ETH', amount: 2.5, value: 4876.50, change: -0.82 },
    { symbol: 'SOL', amount: 45, value: 1955.92, change: 5.21 },
  ],
  recentTrades: [
    { id: 1, pair: 'BTC/USDT', type: 'BUY', price: 42150.00, amount: 0.02, time: '2m ago', pnl: 45.20 },
    { id: 2, pair: 'ETH/USDT', type: 'SELL', price: 2234.50, amount: 0.5, time: '5m ago', pnl: -12.30 },
    { id: 3, pair: 'SOL/USDT', type: 'BUY', price: 42.15, amount: 10, time: '12m ago', pnl: 28.50 },
    { id: 4, pair: 'BTC/USDT', type: 'SELL', price: 42580.00, amount: 0.01, time: '18m ago', pnl: 18.90 },
  ],
  status: 'Running',
  activeStrategies: ['Grid Trading', 'DCA', ' Momentum'],
};

function App() {
  const [botStatus, setBotStatus] = useState('Running');

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="logo">🤖</span> Trading Bot
        </div>
        <div className="nav-links">
          <span className="nav-link active">Dashboard</span>
          <span className="nav-link">Orders</span>
          <span className="nav-link">Settings</span>
        </div>
        <button className="btn-stop" onClick={() => setBotStatus(botStatus === 'Running' ? 'Stopped' : 'Running')}>
          {botStatus === 'Running' ? 'Stop Bot' : 'Start Bot'}
        </button>
      </nav>

      <div className="main-content">
        <div className="status-bar">
          <div className={`status-indicator ${botStatus.toLowerCase()}`}></div>
          <span>Bot Status: <strong>{botStatus}</strong></span>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Total Balance</div>
            <div className="stat-value">${MOCK_DATA.totalBalance.toLocaleString()}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Daily P&L</div>
            <div className="stat-value positive">+${MOCK_DATA.dailyPnL.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Monthly P&L</div>
            <div className="stat-value positive">+${MOCK_DATA.monthlyPnL.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Trades</div>
            <div className="stat-value">{MOCK_DATA.trades}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Win Rate</div>
            <div className="stat-value">{MOCK_DATA.winRate}%</div>
          </div>
        </div>

        <div className="content-grid">
          <div className="card holdings-card">
            <h3>Holdings</h3>
            <table className="holdings-table">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Amount</th>
                  <th>Value</th>
                  <th>24h Change</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_DATA.holdings.map((h) => (
                  <tr key={h.symbol}>
                    <td className="asset-name">{h.symbol}</td>
                    <td>{h.amount}</td>
                    <td>${h.value.toLocaleString()}</td>
                    <td className={h.change >= 0 ? 'positive' : 'negative'}>
                      {h.change >= 0 ? '+' : ''}{h.change}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card trades-card">
            <h3>Recent Trades</h3>
            <div className="trades-list">
              {MOCK_DATA.recentTrades.map((t) => (
                <div key={t.id} className="trade-item">
                  <div className="trade-info">
                    <span className={`trade-type ${t.type.toLowerCase()}`}>{t.type}</span>
                    <span className="trade-pair">{t.pair}</span>
                    <span className="trade-price">@ ${t.price.toLocaleString()}</span>
                  </div>
                  <div className="trade-meta">
                    <span className="trade-time">{t.time}</span>
                    <span className={`trade-pnl ${t.pnl >= 0 ? 'positive' : 'negative'}`}>
                      {t.pnl >= 0 ? '+' : ''}${t.pnl.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card strategies-card">
          <h3>Active Strategies</h3>
          <div className="strategy-tags">
            {MOCK_DATA.activeStrategies.map((s) => (
              <span key={s} className="strategy-tag">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;