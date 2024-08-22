import { ICategory } from '../categories/category.interface';

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

export interface ICategoryStatistics {
  type: FinanceType;
  categoryId: number;
  totalAmount: number;
  category: ICategory;
}

export interface ITotalStatistics {
  type: FinanceType;
  categoryId: number;
  totalAmount: number;
}

export interface IMonthlyStatistics {
  type: FinanceType;
  categoryId: number;
  totalAmount: number;
}

export interface IFinanceCount {
  count: number;
}
