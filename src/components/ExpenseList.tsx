import React from 'react';
import type { Expense } from '../types/expense';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete?: (id: number) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  return (
    <div style={{ marginBottom: 80 }}>
      {expenses.map((exp) => (
        <div
          key={exp.id}
          className="expense-card"
          style={{
            borderLeft: `8px solid ${exp.payer === 'ふみちゃん' ? '#ff8c8c' : '#1976d2'}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
            padding: 16,
            background: '#fff6f6',
            borderRadius: 18,
            boxShadow: '0 2px 8px rgba(255, 170, 170, 0.10)',
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', fontSize: 16 }}>
              {exp.description}（{exp.date}）
            </div>
            <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>
              {exp.description === '送金'
                ? `${exp.payer}が送金`
                : exp.payer === '中野'
                  ? '🧑‍💼中野が支払い'
                  : '👩‍💼ふみちゃんが支払い'}
              {exp.memo && ` ／ ${exp.memo}`}
            </div>
          </div>
          <span
            className="amount"
            style={{
              color: exp.payer === 'ふみちゃん' ? '#ff8c8c' : '#1976d2',
              fontWeight: 'bold',
              fontSize: 20,
              marginLeft: 12,
              minWidth: 80,
              textAlign: 'right',
              fontFamily: "'M PLUS Rounded 1c', 'Noto Sans JP', sans-serif",
            }}
          >
            ￥{exp.amount}
          </span>
          {onDelete && (
            <button
              onClick={() => onDelete(exp.id)}
              className="delete-btn"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginLeft: 8,
                fontSize: 18,
                color: '#bbb',
                transition: 'color 0.2s',
              }}
              aria-label="削除"
              title="削除"
              onMouseOver={e => (e.currentTarget.style.color = '#ff8c8c')}
              onMouseOut={e => (e.currentTarget.style.color = '#bbb')}
            >
              🗑️
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
