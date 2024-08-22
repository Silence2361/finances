import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { ModelClass } from 'objection';
import { Category } from '../categories/categories.model';
import {
  ICategory,
  ICategoryCount,
  ICreateCategory,
  IUpdateCategory,
} from './category.interface';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectModel(Category) private readonly categoryModel: ModelClass<Category>,
  ) {}

  async createCategory(createCategory: ICreateCategory): Promise<ICategory> {
    return this.categoryModel.query().insert(createCategory);
  }

  async findAllCategories(paginationOptions: {
    offset: number;
    limit: number;
  }): Promise<ICategory[]> {
    return await this.categoryModel
      .query()
      .offset(paginationOptions.offset)
      .limit(paginationOptions.limit);
  }

  async findCategoryById(categoryId: number): Promise<ICategory | null> {
    return this.categoryModel.query().findById(categoryId);
  }

  async categoriesCount(): Promise<number> {
    const result = await this.categoryModel
      .query()
      .count('id as count')
      .castTo<ICategoryCount[]>();

    return result[0].count;
  }

  async findCategoryByName(name: string): Promise<ICategory | null> {
    return this.categoryModel.query().findOne({ name });
  }

  async updateCategoryById(
    categoryId: number,
    updateCategory: IUpdateCategory,
  ): Promise<void> {
    await this.categoryModel
      .query()
      .patchAndFetchById(categoryId, updateCategory);
  }

  async deleteCategoryById(categoryId: number): Promise<void> {
    await this.categoryModel.query().deleteById(categoryId);
  }
}
