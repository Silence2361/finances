import { ConflictException, Injectable } from '@nestjs/common';
import {
  CreateCategoryFeatureParams,
  CreateCategoryFeatureResult,
} from './create-category.types';
import { CategoriesRepository } from '../../../database/categories/category.repository';

@Injectable()
export class CreateCategoryFeature {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async execute(
    params: CreateCategoryFeatureParams,
  ): Promise<CreateCategoryFeatureResult> {
    const { name } = params;
    const existingCategory =
      await this.categoriesRepository.findCategoryByName(name);
    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }

    const { id } = await this.categoriesRepository.createCategory({ name });
    return { id };
  }
}
