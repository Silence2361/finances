import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create.category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';
import { CategoriesRepository } from '../repositories/category.repository';
import { ICategory } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    const existingCategory = await this.categoriesRepository.findCategoryByName(
      createCategoryDto.name,
    );
    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }
    try {
      return await this.categoriesRepository.createCategory(createCategoryDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create category');
    }
  }

  async findAllCategories(): Promise<ICategory[]> {
    try {
      return this.categoriesRepository.findAllCategories();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to get categories');
    }
  }

  async findCategoryById(id: number): Promise<ICategory | null> {
    try {
      const category: ICategory | null =
        await this.categoriesRepository.findCategoryById(id);
      if (!category) {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to get category');
    }
  }

  async updateCategoryById(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory | null> {
    try {
      const category: ICategory | null =
        await this.categoriesRepository.updateCategoryById(
          id,
          updateCategoryDto,
        );
      if (!category) {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update category');
    }
  }

  async deleteCategoryById(id: number): Promise<void> {
    try {
      const category = await this.categoriesRepository.findCategoryById(id);
      if (!category) {
        throw new NotFoundException(`Category with id ${id} not found`);
      }
      await this.categoriesRepository.deleteCategoryById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete category');
    }
  }
}
