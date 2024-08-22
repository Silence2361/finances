import { FinanceType } from '../../../database/finances/finance.interface';

export interface FindTotalStatisticsFeatureParams {
  userId: number;
}

export interface FindTotalStatisticsFeatureResult {
  type: FinanceType;
  categoryId: number;
  totalAmount: number;
}
