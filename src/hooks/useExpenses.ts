import { useState, useEffect } from 'react';
import { ref, onValue, set, remove, push } from 'firebase/database';
import { database } from '../firebase/config';
import type { Expense, ExpenseForm } from '../types/expense';

const DEFAULT_RATIO = 0.5;

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const expensesRef = ref(database, 'expenses');
    
    const unsubscribe = onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const expensesArray = Object.entries(data).map(([id, expense]: [string, any]) => ({
          ...expense,
          id: Number(id)
        }));
        setExpenses(expensesArray.sort((a, b) => b.id - a.id));
      } else {
        setExpenses([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addExpense = async (form: ExpenseForm) => {
    if (!form.description || !form.amount) return;
    
    const newExpense = {
      date: form.date.replace(/-/g, '/'),
      description: form.description,
      amount: Number(form.amount),
      payer: form.payer,
      ratio: form.ratio,
    };

    const expensesRef = ref(database, 'expenses');
    const newExpenseRef = push(expensesRef);
    await set(newExpenseRef, newExpense);
  };

  const addSettlement = async (amount: number, payer: '中野' | 'ふみちゃん', memo: string) => {
    const newSettlement = {
      date: new Date().toISOString().slice(0, 10).replace(/-/g, '/'),
      description: '送金',
      amount,
      payer,
      memo: memo || undefined,
      ratio: DEFAULT_RATIO,
    };

    const expensesRef = ref(database, 'expenses');
    const newSettlementRef = push(expensesRef);
    await set(newSettlementRef, newSettlement);
  };

  const deleteExpense = async (id: number) => {
    const expenseRef = ref(database, `expenses/${id}`);
    await remove(expenseRef);
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
    loading,
    addExpense,
    addSettlement,
    deleteExpense,
    calculateBalance,
    DEFAULT_RATIO,
  };
}; 