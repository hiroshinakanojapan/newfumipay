import React from 'react';

interface BalanceDisplayProps {
  balance: number;
}

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return (
    <div
      style={{
        background: balance < 0 ? '#ffe5e5' : '#e5f7ee',
        color: balance < 0 ? '#d32f2f' : '#388e3c',
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
      }}
    >
      {balance < 0
        ? `相手に返す：￥${Math.abs(Math.round(balance))}`
        : `相手から受け取る：￥${Math.round(balance)}`}
    </div>
  );
}; 