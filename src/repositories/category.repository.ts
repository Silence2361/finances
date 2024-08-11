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
    const category: ICategory = await this.categoryModel
      .query()
      .insert(createCategoryDto);
    return category;
  }

  async findAllCategories(): Promise<ICategory[]> {
    const categories: ICategory[] = await this.categoryModel.query();
    return categories;
  }

  async findCategoryById(id: number): Promise<ICategory | null> {
    const category: ICategory | null = await this.categoryModel
      .query()
      .findById(id);
    return category;
  }

  async findCategoryByName(name: string): Promise<ICategory | null> {
    const category: ICategory | null = await this.categoryModel
      .query()
      .findOne({ name });
    return category;
  }

  async updateCategoryById(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory | null> {
    const category: ICategory | null = await this.categoryModel
      .query()
      .patchAndFetchById(id, updateCategoryDto);
    return category;
  }

  async deleteCategoryById(id: number): Promise<void> {
    await this.categoryModel.query().deleteById(id);
  }
}
