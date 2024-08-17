import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from '../../database/repositories/category.repository';
import {
  ICategory,
  ICategoryDetails,
} from '../../database/categories-database/interfaces/category.interface';

@Injectable()
export class CategoriesQueryService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAllCategories(): Promise<ICategoryDetails[]> {
    return this.categoriesRepository.findAllCategories();
  }

  async findCategoryById(id: number): Promise<ICategoryDetails | null> {
    const category: ICategory | null =
      await this.categoriesRepository.findCategoryById(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }
}
