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
import { CategoriesService } from './categories.service';
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
import { UpdateCategoryDto } from './dto/update.category.dto';
import { UpdateCategoryResponseDto } from './dto/update-category-response.dto';
import { CategoryByIdResponseDto } from './dto/category-by-id-response.dto';
import { CategoriesListResponseDto } from './dto/categories-list-response.dto';
import { CreateCategoryResponseDto } from './dto/create-category-response.dto';
import { CategoriesQueryService } from './categories-query.service';

@ApiTags('categories')
@Controller('categories')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly categoriesQueryService: CategoriesQueryService,
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
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ type: [CategoriesListResponseDto] })
  @ApiResponse({ status: 200, description: 'Categories returned successfully' })
  async findAllCategories(): Promise<CategoriesListResponseDto[]> {
    return this.categoriesQueryService.findAllCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @ApiOkResponse({ type: CategoryByIdResponseDto })
  @ApiResponse({ status: 200, description: 'Category returned successfully' })
  async findCategoryById(
    @Param('id') id: number,
  ): Promise<CategoryByIdResponseDto | null> {
    return this.categoriesQueryService.findCategoryById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a category' })
  @ApiOkResponse({ type: UpdateCategoryResponseDto })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  async updateCategoryById(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<UpdateCategoryResponseDto | null> {
    return this.categoriesService.updateCategoryById(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 204, description: 'Category deleted successfully' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCategory(@Param('id') id: number): Promise<void> {
    await this.categoriesService.deleteCategoryById(id);
  }
}
