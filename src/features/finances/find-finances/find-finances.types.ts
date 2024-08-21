import { IFinance } from '../../../database/finances/finance.interface';

export interface FindFinancesFeatureParams {
  userId: number;
  type?: string;
}

export interface FindFinancesFeatureResult {
  finances: IFinance[];
}
