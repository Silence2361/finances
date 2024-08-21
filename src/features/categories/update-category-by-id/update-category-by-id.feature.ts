import { Injectable, NotFoundException } from '@nestjs/common';
import { ICategory } from '../../../database/categories/category.interface';
import {
  UpdateCategoryByIdFeatureParams,
  UpdateCategoryByIdFeatureResult,
} from './update-category-by-id.types';
import { CategoriesRepository } from '../../../database/categories/category.repository';

@Injectable()
export class UpdateCategoryByIdFeature {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(
    categoryId: number,
    updateCategoryData: UpdateCategoryByIdFeatureParams,
  ): Promise<UpdateCategoryByIdFeatureResult | null> {
    const { name } = updateCategoryData;

    const category: ICategory | null =
      await this.categoriesRepository.updateCategoryById(categoryId, { name });

    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

    return category;
  }
}
