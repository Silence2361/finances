import { ICategory } from '../../../database/categories/category.interface';

export interface GetCategoriesFeatureParams {
  page: number;
  pageSize: number;
}

export interface GetCategoriesFeatureResult {
  docs: ICategory[];
  count: number;
}
