import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../../../database/repositories/category.repository';
import {
  GetCategoriesFeatureParams,
  GetCategoriesFeatureResult,
} from './get-categories.types';

@Injectable()
export class GetCategoriesFeature {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(
    params: GetCategoriesFeatureParams,
  ): Promise<GetCategoriesFeatureResult[]> {
    return this.categoriesRepository.findAllCategories();
  }
}
