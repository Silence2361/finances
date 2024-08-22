import { FinanceType } from '../../../database/finances/finances.model';

export interface FindMonthlyStatisticsFeatureParams {
  userId: number;
  month: number;
  year: number;
}

export interface FindTotalStatisticsFeatureResult {
  type: FinanceType;
  categoryId: number;
  totalAmount: number;
}
