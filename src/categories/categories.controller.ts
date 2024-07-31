import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create.category.dto';
import { Category } from './categories.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRequest } from '../auth/interfaces/user-request.interface';
import { JwtAuthGuard } from '../auth/JwtAuthGuard/jwt-auth.guard';
import { UpdateCategoryDto } from './dto/update.category.dto';

@Controller('categories')
export class CategoriesController {


    constructor(private readonly categoriesService: CategoriesService){}


    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'Category created successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @Post()
    async createCategory(@Body()dto: CreateCategoryDto): Promise<Category>{
        return this.categoriesService.createCategory(dto);
    }


    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({ status: 200, description: 'Categories returned successfully' })
    @Get()
    async getAllCategories(): Promise <Category[]>{
        return this.categoriesService.getAllCategories();
    }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  async updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({summary: 'Delete category'})
    @ApiResponse({ status: 200, description: 'Category deleted successfully' })
    async deleteCategory(@Param('id') id: number){
        await this.categoriesService.deleteCategory(id);
        return { message: 'Category deleted successfully'}
    }
}
