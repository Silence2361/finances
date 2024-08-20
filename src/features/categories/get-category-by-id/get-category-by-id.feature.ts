import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from '../../../database/repositories/category.repository';
import { ICategory } from '../../../database/categories-database/interfaces/category.interface';
import {
  GetCategoryByIdFeatureParams,
  GetCategoryByIdFeatureResult,
} from './get-category-by-id.types';

@Injectable()
export class GetCategoryByIdFeature {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(
    params: GetCategoryByIdFeatureParams,
  ): Promise<GetCategoryByIdFeatureResult | null> {
    const { id } = params;

    const category: ICategory | null =
      await this.categoriesRepository.findCategoryById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }
}
