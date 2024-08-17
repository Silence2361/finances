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

export interface ICreateFinanceResponse {
  id: number;
}

export interface IFindFinancesResponse {
  finances: IFinanceDetails[];
}

export interface IFinanceDetails {
  id: number;
  amount: number;
  date: string;
  description?: string;
  categoryId: number;
  userId: number;
  type: FinanceType;
}

export interface IUpdateFinance {
  amount?: number;
  date?: string;
  description?: string;
  categoryId?: number;
  type?: FinanceType;
}

export interface ICategoryStatistics {
  categoryId: number;
  totalAmount: number;
}

export interface ITotalStatistics {
  type: string;
  total: number;
}

export interface IMonthlyStatistics {
  type: string;
  total: number;
}
