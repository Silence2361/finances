import { ICategory } from '../../../database/categories/category.interface';
import { FinanceType } from '../../../database/finances/finances.model';

export interface GetCategoryStatisticsFeatureParams {
  userId: number;
}

export interface GetCategoryStatisticsFeatureResult {
  categoryId: number;
  totalAmount: number;
  type: FinanceType;
  category: ICategory;
}
