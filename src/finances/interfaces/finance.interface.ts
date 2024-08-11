export interface IFinance {
  id?: number;
  amount: number;
  type: FinanceType;
  category_id: number;
  description?: string;
  user_id: number;
  date: string;
}

export enum FinanceType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
