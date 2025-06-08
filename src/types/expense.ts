export interface Expense {
  id: number;
  date: string;
  description: string;
  amount: number;
  payer: '中野' | 'ふみちゃん';
  memo?: string;
  ratio?: number; // 中野の負担割合（0〜1）
}

export interface ExpenseForm {
  date: string;
  description: string;
  amount: string;
  payer: '中野' | 'ふみちゃん';
  memo: string;
  ratio: number;
} 