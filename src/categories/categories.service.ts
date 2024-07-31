import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection/dist';
import { ModelClass } from 'objection';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update.category.dto';

@Injectable()
export class CategoriesService {


    constructor(@InjectModel(Category) private readonly categoryModel: ModelClass<Category> ){}


    async createCategory(dto: CreateCategoryDto): Promise<Category>{
        return this.categoryModel.query().insert(dto)
    }

    async getAllCategories(): Promise<Category[]>{
        return this.categoryModel.query()
    }

    async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category>{
        const category  = await this.categoryModel.query().patchAndFetchById(id, updateCategoryDto);
        if (!category ) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }
        return category ;
    }

    async deleteCategory(id: number): Promise<void> {
        const deletedCategory = await this.categoryModel.query().deleteById(id)
        if (!deletedCategory) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }
    }
}
