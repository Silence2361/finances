import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteCategoryByIdFeatureParams } from './delete-category-by-id.types';
import { CategoriesRepository } from '../../../database/categories/category.repository';

@Injectable()
export class DeleteCategoryByIdFeature {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(params: DeleteCategoryByIdFeatureParams): Promise<void> {
    const { id } = params;

    const category = await this.categoriesRepository.findCategoryById(id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    await this.categoriesRepository.deleteCategoryById(id);
  }
}
