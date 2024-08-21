import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../third-party/jwt/jwt-auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryByIdResponseDto } from './dto/category-by-id-response.dto';
import { CategoriesListResponseDto } from './dto/categories-list-response.dto';
import { CreateCategoryResponseDto } from './dto/create-category-response.dto';
import { CreateCategoryFeature } from '../../features/categories/create-category/create-category.feature';
import { UpdateCategoryByIdFeature } from '../../features/categories/update-category-by-id/update-category-by-id.feature';
import { GetCategoriesFeature } from '../../features/categories/get-categories/get-categories.feature';
import { GetCategoryByIdFeature } from '../../features/categories/get-category-by-id/get-category-by-id.feature';
import { DeleteCategoryByIdFeature } from '../../features/categories/delete-category-by-id/delete-category-by-id.features';

@ApiTags('categories')
@Controller('categories')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CategoriesController {
  constructor(
    private readonly createCategoryFeature: CreateCategoryFeature,
    private readonly updateCategoryByIdFeature: UpdateCategoryByIdFeature,
    private readonly getCategoriesFeature: GetCategoriesFeature,
    private readonly getCategoryByIdFeature: GetCategoryByIdFeature,
    private readonly deleteCategoryByIdFeature: DeleteCategoryByIdFeature,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @ApiCreatedResponse({ type: CreateCategoryResponseDto })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @HttpCode(HttpStatus.CREATED)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CreateCategoryResponseDto> {
    return this.createCategoryFeature.execute(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ type: [CategoriesListResponseDto] })
  @ApiResponse({ status: 200, description: 'Categories returned successfully' })
  async findAllCategories(): Promise<CategoriesListResponseDto[]> {
    return this.getCategoriesFeature.execute({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiOkResponse({ type: CategoryByIdResponseDto })
  @ApiResponse({ status: 200, description: 'Category returned successfully' })
  async findCategoryById(
    @Param('id') id: number,
  ): Promise<CategoryByIdResponseDto | null> {
    return this.getCategoryByIdFeature.execute({ id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiOkResponse()
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  async updateCategoryById(
    @Param('id') categoryId: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    await this.updateCategoryByIdFeature.execute(categoryId, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 204, description: 'Category deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(@Param('id') id: number): Promise<void> {
    await this.deleteCategoryByIdFeature.execute({ id });
  }
}
