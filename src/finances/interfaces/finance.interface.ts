export interface IFinance {
  id: number;
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

export interface ICreateFinance {
  amount: number;
  date: string;
  description?: string;
  category_id: number;
  user_id?: number;
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
  category_id: number;
  user_id: number;
  type: FinanceType;
}

export interface IUpdateFinance {
  amount?: number;
  date?: string;
  description?: string;
  category_id?: number;
  type?: FinanceType;
}
