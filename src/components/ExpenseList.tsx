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
          style={{
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            padding: 12,
            marginBottom: 12,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>
              {exp.date} {exp.description}
            </span>
            <span style={{ color: '#1976d2', fontWeight: 'bold' }}>￥{exp.amount}</span>
            {onDelete && (
              <button
                onClick={() => onDelete(exp.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: 8,
                  fontSize: 18,
                  color: '#888',
                }}
                aria-label="削除"
                title="削除"
              >
                🗑️
              </button>
            )}
          </div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>
            {exp.payer === '自分' ? '🧑‍💼自分が支払い' : '👩‍💼相手が支払い'}
            {exp.memo && ` ／ ${exp.memo}`}
          </div>
        </div>
      ))}
    </div>
  );
}; 