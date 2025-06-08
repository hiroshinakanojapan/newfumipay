import React from 'react';

interface BalanceDisplayProps {
  balance: number;
}

export const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return (
    <div className="balance-summary" style={{ textAlign: 'center' }}>
      <div style={{
        color: balance < 0 ? '#1976d2' : '#ff8c8c',
        fontWeight: 'bold',
        fontSize: 32,
        marginBottom: 4,
      }}>
        ￥{Math.abs(Math.round(balance))}
      </div>
      <div style={{ fontSize: 16, color: '#888' }}>
        {balance < 0 ? '中野が受け取る' : 'ふみちゃんが受け取る'}
      </div>
    </div>
  );
}; 