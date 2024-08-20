import { ConflictException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../../../database/repositories/category.repository';
import {
  CreateCategoryFeatureParams,
  CreateCategoryFeatureResult,
} from './create-category.types';

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
