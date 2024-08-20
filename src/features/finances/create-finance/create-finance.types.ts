export enum FinanceType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface CreateFinanceFeatureParams {
  amount: number;
  date: string;
  description?: string;
  categoryId: number;
  userId?: number;
  type: FinanceType;
}

export interface CreateFinanceFeatureResult {
  id: number;
}
