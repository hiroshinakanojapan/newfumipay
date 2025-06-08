import { useState, useEffect } from 'react';
import type { Expense, ExpenseForm } from '../types/expense';

const STORAGE_KEY = 'couple-expense-history';
const DEFAULT_RATIO = 0.5;

const initialExpenses: Expense[] = [
  { id: 1, date: '2025/06/01', description: '食料品', amount: 3000, payer: '中野', ratio: DEFAULT_RATIO },
  { id: 2, date: '2025/05/30', description: '映画代', amount: 2000, payer: 'ふみちゃん', ratio: DEFAULT_RATIO },
  { id: 3, date: '2025/05/28', description: '精算', amount: 5000, payer: '中野', memo: 'PayPay', ratio: DEFAULT_RATIO },
];

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialExpenses;
      }
    }
    return initialExpenses;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (form: ExpenseForm) => {
    if (!form.description || !form.amount) return;
    
    setExpenses((prev) => [
      {
        id: prev.length ? prev[0].id + 1 : 1,
        date: form.date.replace(/-/g, '/'),
        description: form.description,
        amount: Number(form.amount),
        payer: form.payer,
        memo: form.memo || undefined,
        ratio: form.ratio,
      },
      ...prev,
    ]);
  };

  const addSettlement = (amount: number, payer: '中野' | 'ふみちゃん', memo: string) => {
    setExpenses((prev) => [
      {
        id: prev.length ? prev[0].id + 1 : 1,
        date: new Date().toISOString().slice(0, 10).replace(/-/g, '/'),
        description: '送金',
        amount,
        payer,
        memo: memo || undefined,
        ratio: DEFAULT_RATIO,
      },
      ...prev,
    ]);
  };

  const deleteExpense = (id: number) => {
    setExpenses((prev) => prev.filter(exp => exp.id !== id));
  };

  const calculateBalance = () => {
    return expenses.reduce((acc, exp) => {
      if (exp.description === '送金') {
        if (exp.payer === '中野') {
          return acc - exp.amount;
        } else {
          return acc + exp.amount;
        }
      }
      const r = typeof exp.ratio === 'number' ? exp.ratio : DEFAULT_RATIO;
      if (exp.payer === '中野') {
        return acc + exp.amount * (1 - r);
      } else {
        return acc - exp.amount * r;
      }
    }, 0);
  };

  return {
    expenses,
    addExpense,
    addSettlement,
    deleteExpense,
    calculateBalance,
    DEFAULT_RATIO,
  };
}; 