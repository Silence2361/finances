import { FinanceType } from '../create-finance/create-finance.types';

export interface UpdateFinanceByIdParams {
  id?: number;
  amount?: number;
  date?: string;
  description?: string;
  categoryId?: number;
  userId?: number;
  type?: FinanceType;
}

export interface UpdateFinanceByIdResult {
  id: number;
  amount: number;
  date: string;
  description?: string;
  categoryId: number;
  userId: number;
  type: FinanceType;
}
