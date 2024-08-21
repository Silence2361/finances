import { Injectable, NotFoundException } from '@nestjs/common';
import { ICategory } from '../../../database/categories/category.interface';
import {
  GetCategoryByIdFeatureParams,
  GetCategoryByIdFeatureResult,
} from './get-category-by-id.types';
import { CategoriesRepository } from '../../../database/categories/category.repository';

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
