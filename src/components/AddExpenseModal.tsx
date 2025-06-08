import React, { useState } from 'react';
import type { ExpenseForm } from '../types/expense';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: ExpenseForm) => void;
  defaultRatio: number;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultRatio,
}) => {
  const [form, setForm] = useState<ExpenseForm>({
    date: new Date().toISOString().slice(0, 10),
    description: '',
    amount: '',
    payer: '自分',
    memo: '',
    ratio: defaultRatio,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'range' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      date: new Date().toISOString().slice(0, 10),
      description: '',
      amount: '',
      payer: '自分',
      memo: '',
      ratio: defaultRatio,
    });
  };

  if (!isOpen) return null;

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
        <h2 style={{ margin: 0, fontSize: 18 }}>支出を追加</h2>
        <label>
          日付：
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleFormChange}
            style={{ width: '100%' }}
            required
          />
        </label>
        <label>
          内容：
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleFormChange}
            style={{ width: '100%' }}
            required
          />
        </label>
        <label>
          金額：
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleFormChange}
            style={{ width: '100%' }}
            required
          />
        </label>
        <label>
          支払い：
          <select
            name="payer"
            value={form.payer}
            onChange={handleFormChange}
            style={{ width: '100%' }}
          >
            <option value="自分">自分</option>
            <option value="相手">相手</option>
          </select>
        </label>
        <label>
          メモ：
          <input
            type="text"
            name="memo"
            value={form.memo}
            onChange={handleFormChange}
            style={{ width: '100%' }}
          />
        </label>
        <label>
          負担割合：
          <input
            type="range"
            name="ratio"
            min="0"
            max="1"
            step="0.1"
            value={form.ratio}
            onChange={handleFormChange}
            style={{ width: '100%' }}
          />
          <div style={{ textAlign: 'center' }}>
            {Math.round(form.ratio * 100)}% : {Math.round((1 - form.ratio) * 100)}%
          </div>
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
          >
            追加
          </button>
        </div>
      </form>
    </div>
  );
}; 