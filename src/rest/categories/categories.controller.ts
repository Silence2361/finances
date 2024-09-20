import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../../third-party/jwt/jwt-auth.guard';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryByIdResponseDto } from './dto/category-by-id-response.dto';
import { CreateCategoryResponseDto } from './dto/create-category-response.dto';
import { CreateCategoryFeature } from '../../features/categories/create-category/create-category.feature';
import { UpdateCategoryByIdFeature } from '../../features/categories/update-category-by-id/update-category-by-id.feature';
import { GetCategoriesFeature } from '../../features/categories/get-categories/get-categories.feature';
import { GetCategoryByIdFeature } from '../../features/categories/get-category-by-id/get-category-by-id.feature';
import { DeleteCategoryByIdFeature } from '../../features/categories/delete-category-by-id/delete-category-by-id.features';
import { CategoryPaginationQueryDto } from './dto/pagination-query.dto';
import { CategoriesListResponseDto } from './dto/categories-list-response.dto';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

@Resolver(() => CategoryByIdResponseDto)
@UseGuards(JwtAuthGuard)
export class CategoryResolver {
  constructor(
    private readonly createCategoryFeature: CreateCategoryFeature,
    private readonly updateCategoryByIdFeature: UpdateCategoryByIdFeature,
    private readonly getCategoriesFeature: GetCategoriesFeature,
    private readonly getCategoryByIdFeature: GetCategoryByIdFeature,
    private readonly deleteCategoryByIdFeature: DeleteCategoryByIdFeature,
  ) {}

  @Mutation(() => CreateCategoryResponseDto)
  async createCategory(
    @Args('createCategoryDto') createCategoryDto: CreateCategoryDto,
  ): Promise<CreateCategoryResponseDto> {
    return this.createCategoryFeature.execute(createCategoryDto);
  }

  @Query(() => CategoriesListResponseDto)
  async findAllCategories(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('pageSize', { type: () => Int, nullable: true }) pageSize: number,
  ): Promise<CategoriesListResponseDto> {
    return this.getCategoriesFeature.execute({ page, pageSize });
  }

  @Query(() => CategoryByIdResponseDto, { nullable: true })
  async findCategoryById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<CategoryByIdResponseDto | null> {
    return this.getCategoryByIdFeature.execute({ id });
  }

  @Mutation(() => Boolean)
  async updateCategoryById(
    @Args('id', { type: () => Int }) categoryId: number,
    @Args('updateCategoryDto') updateCategoryDto: UpdateCategoryDto,
  ): Promise<boolean> {
    await this.updateCategoryByIdFeature.execute(categoryId, updateCategoryDto);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.deleteCategoryByIdFeature.execute({ id });
    return true;
  }
}
