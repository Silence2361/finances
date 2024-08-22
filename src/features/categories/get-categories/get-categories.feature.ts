import { Injectable } from '@nestjs/common';
import {
  GetCategoriesFeatureParams,
  GetCategoriesFeatureResult,
} from './get-categories.types';
import { CategoriesRepository } from '../../../database/categories/category.repository';
import { ICategory } from '../../../database/categories/category.interface';

@Injectable()
export class GetCategoriesFeature {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(
    params: GetCategoriesFeatureParams,
  ): Promise<GetCategoriesFeatureResult> {
    const { page = 1, pageSize = 10 } = params;

    const offset = (page - 1) * pageSize;

    const categories: ICategory[] =
      await this.categoriesRepository.findAllCategories({
        offset,
        limit: pageSize,
      });

    const count = await this.categoriesRepository.categoriesCount();
    return {
      docs: categories.map(({ id, name }) => ({
        id,
        name,
      })),
      count,
    };
  }
}
