import React, { useState, useEffect } from 'react';

interface SettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, payer: '中野' | 'ふみちゃん', memo: string) => void;
  defaultAmount: number;
  payer: '中野' | 'ふみちゃん';
  mode: 'give' | 'receive';
}

export const SettlementModal: React.FC<SettlementModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultAmount,
  payer,
  mode,
}) => {
  const [amount, setAmount] = useState(defaultAmount);
  const [memo, setMemo] = useState('');

  useEffect(() => {
    setAmount(defaultAmount);
  }, [defaultAmount, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) return;
    onSubmit(amount, payer, memo);
    setAmount(defaultAmount);
    setMemo('');
  };

  if (!isOpen) return null;

  const title = mode === 'give' ? 'ふみが送金' : '中野が送金';
  const label = mode === 'give' ? 'ふみちゃんが送金した金額' : '中野が送金した金額';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: 24,
          minWidth: 280,
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 18 }}>{title}</h2>
        <label>
          {label}：
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            style={{ width: '100%' }}
            required
            min={1}
          />
        </label>
        <label>
          メモ：
          <input
            type="text"
            value={memo}
            onChange={e => setMemo(e.target.value)}
            style={{ width: '100%' }}
            placeholder="例：PayPay、現金など"
          />
        </label>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: 8,
              background: '#f5f5f5',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            キャンセル
          </button>
          <button
            type="submit"
            style={{
              flex: 1,
              padding: 8,
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
            disabled={amount <= 0}
          >
            記録
          </button>
        </div>
      </form>
    </div>
  );
}; 