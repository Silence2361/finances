import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { ModelClass } from 'objection';
import { Category } from '../categories/categories.model';
import {
  ICategory,
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

  async findAllCategories(): Promise<ICategory[]> {
    return this.categoryModel.query();
  }

  async findCategoryById(categoryId: number): Promise<ICategory | null> {
    return this.categoryModel.query().findById(categoryId);
  }

  async categoriesCount(): Promise<number> {
    const result: any = await this.categoryModel.query().count('id as count');
    return result[0].count;
    // [{count : number}]
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
