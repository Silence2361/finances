import { ConflictException, Injectable } from '@nestjs/common';
import {
  CreateCategoryFeatureParams,
  CreateCategoryFeatureResult,
} from './create-category.types';
import { CategoriesRepository } from '../../../database/categories/category.repository';
import { ICategory } from '../../../database/categories/category.interface';

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

    const createCategory: ICategory =
      await this.categoriesRepository.createCategory({
        name,
      });
    return { id: createCategory.id };
  }
}
