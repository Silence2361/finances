import { ICategory } from '../../../database/categories/category.interface';
import { GetCategoriesFeatureResult } from '../../../features/categories/get-categories/get-categories.types';

export class CategoriesListResponseDto implements GetCategoriesFeatureResult {
  docs: ICategory[];
  count: number;
}
