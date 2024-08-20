import { IFinance } from '../../../database/finances-database/interfaces/finance.interface';

export interface FindFinancesFeatureParams {
  userId: number;
  type?: string;
}

export interface FindFinancesFeatureResult {
  finances: IFinance[];
}
