import { ICategory } from '../../../database/categories/category.interface';
import { ICategoryStatistics } from '../../../database/finances/finance.interface';
import { FinanceType } from '../../../database/finances/finances.model';

export interface FindCategoryStatisticsFeatureParams {
  userId: number;
}

export interface FindCategoryStatisticsFeatureResult {
  categoryId: number;
  totalAmount: number;
  type: FinanceType;
  category: ICategory;
  // statistics: ICategoryStatistics[];
}
