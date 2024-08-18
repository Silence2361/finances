import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from '../../database/repositories/category.repository';
import {
  ICategory,
  IFindAllCategoriesResponse,
  IFindCategoryByIdResponse,
} from '../../database/categories-database/interfaces/category.interface';

@Injectable()
export class CategoriesQueryService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAllCategories(): Promise<IFindAllCategoriesResponse[]> {
    return this.categoriesRepository.findAllCategories();
  }

  async findCategoryById(
    categoryId: number,
  ): Promise<IFindCategoryByIdResponse | null> {
    const category: ICategory | null =
      await this.categoriesRepository.findCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }
    return category;
  }
}
