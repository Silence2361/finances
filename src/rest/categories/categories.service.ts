import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesRepository } from '../../database/repositories/category.repository';
import {
  ICategory,
  ICategoryDetails,
  ICategoryResponse,
  ICreateCategory,
  IUpdateCategory,
} from '../../database/categories-database/interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(
    createCategory: ICreateCategory,
  ): Promise<ICategoryResponse> {
    const existingCategory = await this.categoriesRepository.findCategoryByName(
      createCategory.name,
    );
    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }

    const category =
      await this.categoriesRepository.createCategory(createCategory);
    return { id: category.id };
  }

  async updateCategoryById(
    id: number,
    updateCategory: IUpdateCategory,
  ): Promise<ICategoryDetails | null> {
    const category: ICategory | null =
      await this.categoriesRepository.updateCategoryById(id, updateCategory);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async deleteCategoryById(id: number): Promise<void> {
    const category = await this.categoriesRepository.findCategoryById(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    await this.categoriesRepository.deleteCategoryById(id);
  }
}
