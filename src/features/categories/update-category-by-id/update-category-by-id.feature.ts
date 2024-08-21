import { Injectable, NotFoundException } from '@nestjs/common';
import { ICategory } from '../../../database/categories/category.interface';
import { UpdateCategoryByIdFeatureParams } from './update-category-by-id.types';
import { CategoriesRepository } from '../../../database/categories/category.repository';

@Injectable()
export class UpdateCategoryByIdFeature {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(
    categoryId: number,
    updateCategoryData: UpdateCategoryByIdFeatureParams,
  ): Promise<void> {
    const { name } = updateCategoryData;

    const categoryExists =
      await this.categoriesRepository.findCategoryById(categoryId);
    if (!categoryExists) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

    await this.categoriesRepository.updateCategoryById(categoryId, { name });
  }
}
