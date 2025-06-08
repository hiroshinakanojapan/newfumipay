export interface Expense {
  id: number;
  date: string;
  description: string;
  amount: number;
  payer: '自分' | '相手';
  memo?: string;
  ratio?: number; // 自分の負担割合（0〜1）
}

export interface ExpenseForm {
  date: string;
  description: string;
  amount: string;
  payer: '自分' | '相手';
  memo: string;
  ratio: number;
} 