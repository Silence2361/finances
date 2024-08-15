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

    return await this.categoriesRepository.createCategory(createCategoryDto);
  }

  async findAllCategories(): Promise<ICategory[]> {
    return this.categoriesRepository.findAllCategories();
  }

  async findCategoryById(id: number): Promise<ICategory | null> {
    const category: ICategory | null =
      await this.categoriesRepository.findCategoryById(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async updateCategoryById(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory | null> {
    const category: ICategory | null =
      await this.categoriesRepository.updateCategoryById(id, updateCategoryDto);
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
