import { useState } from 'react'
import './App.css'
import { BalanceDisplay } from './components/BalanceDisplay'
import { ExpenseList } from './components/ExpenseList'
import { AddExpenseModal } from './components/AddExpenseModal'
import { useExpenses } from './hooks/useExpenses'
import { SettlementModal } from './components/SettlementModal'

function App() {
  const { expenses, addExpense, addSettlement, deleteExpense, calculateBalance, DEFAULT_RATIO, loading } = useExpenses();
  const [showModal, setShowModal] = useState(false);
  const [showGiveModal, setShowGiveModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  const balance = calculateBalance();
  const defaultAmount = Math.abs(Math.round(balance));

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-orange-50 p-4">
      <div className="max-w-md mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">ふみペイ</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-pink-400 to-orange-400 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
          >
            支出を追加
          </button>
        </header>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto"></div>
            <p className="mt-4 text-gray-600">データを読み込み中...</p>
          </div>
        ) : (
          <>
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
          </>
        )}
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
    </div>
  )
}

export default App
