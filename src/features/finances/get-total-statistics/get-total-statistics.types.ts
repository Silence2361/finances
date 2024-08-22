import { FinanceType } from '../../../database/finances/finance.interface';

export interface GetTotalStatisticsFeatureParams {
  userId: number;
}

export interface GetTotalStatisticsFeatureResult {
  type: FinanceType;
  categoryId: number;
  totalAmount: number;
}
