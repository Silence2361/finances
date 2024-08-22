import { FinanceType } from '../../../database/finances/finances.model';

export interface GetMonthlyStatisticsFeatureParams {
  userId: number;
  month: number;
  year: number;
}

export interface GetTotalStatisticsFeatureResult {
  type: FinanceType;
  categoryId: number;
  totalAmount: number;
}
