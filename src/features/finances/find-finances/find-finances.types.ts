import { IFinance } from '../../../database/finances-database/interfaces/finance.interface';

export interface FindFinancesFeatureParams {
  type?: string;
}

export interface FindFinancesFeatureResult {
  finances: IFinance[];
}
