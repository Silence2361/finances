import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesRepository } from '../../database/repositories/category.repository';
import {
  ICategory,
  ICreateCategory,
  ICreateCategoryResponse,
  IUpdateCategory,
  IUpdateCategoryResponse,
} from '../../database/categories-database/interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(
    createCategoryData: ICreateCategory,
  ): Promise<ICreateCategoryResponse> {
    const { name } = createCategoryData;
    const existingCategory =
      await this.categoriesRepository.findCategoryByName(name);
    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }

    const { id } = await this.categoriesRepository.createCategory({ name });
    return { id };
  }

  async updateCategoryById(
    categoryId: number,
    updateCategoryData: IUpdateCategory,
  ): Promise<IUpdateCategoryResponse | null> {
    const { name } = updateCategoryData;
    const category: ICategory | null =
      await this.categoriesRepository.updateCategoryById(categoryId, { name });
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }
    return category;
  }

  async deleteCategoryById(categoryId: number): Promise<void> {
    const category =
      await this.categoriesRepository.findCategoryById(categoryId);
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }
    await this.categoriesRepository.deleteCategoryById(categoryId);
  }
}
