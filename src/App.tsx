import { useState } from 'react'
import './App.css'
import { BalanceDisplay } from './components/BalanceDisplay'
import { ExpenseList } from './components/ExpenseList'
import { AddExpenseModal } from './components/AddExpenseModal'
import { useExpenses } from './hooks/useExpenses'
import { SettlementModal } from './components/SettlementModal'

// 仮の支出データ型
interface Expense {
  id: number;
  date: string;
  description: string;
  amount: number;
  payer: '自分' | '相手';
  memo?: string;
  ratio?: number; // 自分の負担割合（0〜1）
}

function App() {
  const { expenses, addExpense, addSettlement, deleteExpense, calculateBalance, DEFAULT_RATIO } = useExpenses();
  const [showModal, setShowModal] = useState(false);
  const [showSettlement, setShowSettlement] = useState(false);
  const [showGiveModal, setShowGiveModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  const balance = calculateBalance();
  const defaultAmount = Math.abs(Math.round(balance));

  return (
    <div className="app-container" style={{ maxWidth: 400, margin: '0 auto', padding: 16, fontFamily: 'sans-serif' }}>
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
          相手に渡した
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
          相手から受け取った
        </button>
      </div>
      <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      <button
        style={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#1976d2',
          color: '#fff',
          fontSize: 32,
          border: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          zIndex: 2000,
        }}
        aria-label="支出を追加"
        onClick={() => setShowModal(true)}
      >
        ＋
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
        onSubmit={(amount, payer, memo) => {
          addSettlement(amount, '自分', memo);
          setShowGiveModal(false);
        }}
        defaultAmount={defaultAmount}
        payer={'自分'}
        mode={'give'}
      />
      <SettlementModal
        isOpen={showReceiveModal}
        onClose={() => setShowReceiveModal(false)}
        onSubmit={(amount, payer, memo) => {
          addSettlement(amount, '相手', memo);
          setShowReceiveModal(false);
        }}
        defaultAmount={defaultAmount}
        payer={'相手'}
        mode={'receive'}
      />
    </div>
  )
}

export default App
