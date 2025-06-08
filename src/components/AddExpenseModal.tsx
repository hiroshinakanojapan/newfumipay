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
    payer: '中野',
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
    onClose();
    setForm({
      date: new Date().toISOString().slice(0, 10),
      description: '',
      amount: '',
      payer: '中野',
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
            <option value="中野">中野</option>
            <option value="ふみちゃん">ふみちゃん</option>
          </select>
        </label>
        <label>
          負担割合：
          <select
            name="ratio"
            value={form.ratio}
            onChange={handleFormChange}
            style={{ width: '100%' }}
          >
            <option value={0.5}>中野:ふみちゃん = 50:50</option>
            <option value={0.66}>中野:ふみちゃん = 66:34</option>
            <option value={0.75}>中野:ふみちゃん = 75:25</option>
            <option value={1}>中野:ふみちゃん = 100:0</option>
          </select>
        </label>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: 8,
              background: '#ffe0e0',
              color: '#d16d6d',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#ffb6b6')}
            onMouseOut={e => (e.currentTarget.style.background = '#ffe0e0')}
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
            disabled={!form.description || !form.amount}
          >
            追加
          </button>
        </div>
      </form>
    </div>
  );
}; 