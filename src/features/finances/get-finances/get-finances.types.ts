import { IFinance } from '../../../database/finances/finance.interface';
import { FinanceType } from '../../../database/finances/finances.model';

export interface GetFinancesFeatureParams {
  type?: FinanceType;
  page: number;
  pageSize: number;
}

export interface GetFinancesFeatureResult {
  docs: IFinance[];
  count: number;
}
