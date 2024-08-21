export interface IFinance {
  id: number;
  amount: number;
  type: FinanceType;
  categoryId: number;
  description?: string;
  userId: number;
  date: string;
}

export enum FinanceType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface ICreateFinance {
  amount: number;
  date: string;
  description?: string;
  categoryId: number;
  userId?: number;
  type: FinanceType;
}

export interface IUpdateFinance {
  id?: number;
  amount?: number;
  date?: string;
  description?: string;
  categoryId?: number;
  userId?: number;
  type?: FinanceType;
}
