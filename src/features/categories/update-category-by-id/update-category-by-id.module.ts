import { Module } from '@nestjs/common';
import { UpdateCategoryByIdFeature } from './update-category-by-id.feature';
import { CategoriesRepository } from '../../../database/repositories/category.repository';

@Module({
  providers: [UpdateCategoryByIdFeature, CategoriesRepository],
  exports: [UpdateCategoryByIdFeature],
})
export class UpdateCategoryByIdModule {}
