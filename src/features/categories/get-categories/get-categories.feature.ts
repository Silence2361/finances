import { Injectable } from '@nestjs/common';
import {
  GetCategoriesFeatureParams,
  GetCategoriesFeatureResult,
} from './get-categories.types';
import { CategoriesRepository } from '../../../database/categories/category.repository';

@Injectable()
export class GetCategoriesFeature {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(
    params: GetCategoriesFeatureParams,
  ): Promise<GetCategoriesFeatureResult[]> {
    return this.categoriesRepository.findAllCategories();
  }
}
