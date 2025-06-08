import { useState } from 'react'
import './App.css'
import { BalanceDisplay } from './components/BalanceDisplay'
import { ExpenseList } from './components/ExpenseList'
import { AddExpenseModal } from './components/AddExpenseModal'
import { useExpenses } from './hooks/useExpenses'
import { SettlementModal } from './components/SettlementModal'

function App() {
  const { expenses, addExpense, addSettlement, deleteExpense, calculateBalance, DEFAULT_RATIO } = useExpenses();
  const [showModal, setShowModal] = useState(false);
  const [showGiveModal, setShowGiveModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  const balance = calculateBalance();
  const defaultAmount = Math.abs(Math.round(balance));

  return (
    <div className="app-container" style={{ maxWidth: 400, margin: '0 auto', padding: 16, fontFamily: 'sans-serif' }}>
      <div className="header" style={{ textAlign: 'center', marginBottom: 16 }}>
        <img src="/assets/kumamon-like.svg" alt="ふみペイキャラ" style={{ width: 64, height: 64, display: 'block', margin: '0 auto 8px' }} />
        <h1 style={{ fontFamily: 'cursive', fontSize: 28, margin: 0 }}>ふみペイ</h1>
      </div>
      <BalanceDisplay balance={calculateBalance()} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button
          style={{
            flex: 1,
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: 12,
            fontWeight: 'bold',
            fontSize: 16,
            cursor: defaultAmount === 0 ? 'not-allowed' : 'pointer',
            opacity: defaultAmount === 0 ? 0.5 : 1,
          }}
          onClick={() => defaultAmount !== 0 && setShowGiveModal(true)}
          disabled={defaultAmount === 0}
        >
          ふみが送金
        </button>
        <button
          style={{
            flex: 1,
            background: '#388e3c',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: 12,
            fontWeight: 'bold',
            fontSize: 16,
            cursor: defaultAmount === 0 ? 'not-allowed' : 'pointer',
            opacity: defaultAmount === 0 ? 0.5 : 1,
          }}
          onClick={() => defaultAmount !== 0 && setShowReceiveModal(true)}
          disabled={defaultAmount === 0}
        >
          中野が送金
        </button>
      </div>
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      <button
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100%',
          height: 64,
          borderRadius: '24px 24px 0 0',
          background: 'linear-gradient(90deg, #ffb6b6 0%, #ffe0e0 100%)',
          color: '#d16d6d',
          fontSize: 22,
          fontWeight: 'bold',
          fontFamily: "'M PLUS Rounded 1c', 'Noto Sans JP', sans-serif",
          border: 'none',
          boxShadow: '0 -4px 16px rgba(255, 170, 170, 0.15)',
          cursor: 'pointer',
          zIndex: 2000,
          letterSpacing: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'background 0.2s, color 0.2s',
        }}
        aria-label="支出を追加"
        onClick={() => setShowModal(true)}
        onMouseOver={e => {
          e.currentTarget.style.background = 'linear-gradient(90deg, #ff8c8c 0%, #ffd6d6 100%)';
          e.currentTarget.style.color = '#fff';
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'linear-gradient(90deg, #ffb6b6 0%, #ffe0e0 100%)';
          e.currentTarget.style.color = '#d16d6d';
        }}
      >
        <span style={{ fontSize: 28 }}>🧸</span>
        支出を追加
      </button>
      <AddExpenseModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={addExpense}
        defaultRatio={DEFAULT_RATIO}
      />
      <SettlementModal
        isOpen={showGiveModal}
        onClose={() => setShowGiveModal(false)}
        onSubmit={(amount, _payer, memo) => {
          addSettlement(amount, 'ふみちゃん', memo);
          setShowGiveModal(false);
        }}
        defaultAmount={defaultAmount}
        payer={'ふみちゃん'}
        mode={'give'}
      />
      <SettlementModal
        isOpen={showReceiveModal}
        onClose={() => setShowReceiveModal(false)}
        onSubmit={(amount, _payer, memo) => {
          addSettlement(amount, '中野', memo);
          setShowReceiveModal(false);
        }}
        defaultAmount={defaultAmount}
        payer={'中野'}
        mode={'receive'}
      />
    </div>
  )
}

export default App
