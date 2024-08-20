import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from '../../../database/repositories/category.repository';
import {
  DeleteCategoryByIdFeatureParams,
  DeleteCategoryByIdFeatureResult,
} from './delete-category-by-id.types';

@Injectable()
export class DeleteCategoryByIdFeature {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(
    params: DeleteCategoryByIdFeatureParams,
  ): Promise<DeleteCategoryByIdFeatureResult> {
    const { id } = params;

    const category = await this.categoriesRepository.findCategoryById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    await this.categoriesRepository.deleteCategoryById(id);

    return { success: true };
  }
}
