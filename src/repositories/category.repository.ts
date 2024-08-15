import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { ModelClass } from 'objection';
import { Category } from '../categories/categories.model';
import { CreateCategoryDto } from '../categories/dto/create.category.dto';
import { UpdateCategoryDto } from '../categories/dto/update.category.dto';
import { ICategory } from '../categories/interfaces/category.interface';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category) private readonly categoryModel: ModelClass<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return this.categoryModel.query().insert(createCategoryDto);
  }

  async findAllCategories(): Promise<ICategory[]> {
    return this.categoryModel.query();
  }

  async findCategoryById(id: number): Promise<ICategory | null> {
    return this.categoryModel.query().findById(id);
  }

  async findCategoryByName(name: string): Promise<ICategory | null> {
    return this.categoryModel.query().findOne({ name });
  }

  async updateCategoryById(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory | null> {
    return this.categoryModel.query().patchAndFetchById(id, updateCategoryDto);
  }

  async deleteCategoryById(id: number): Promise<void> {
    await this.categoryModel.query().deleteById(id);
  }
}
