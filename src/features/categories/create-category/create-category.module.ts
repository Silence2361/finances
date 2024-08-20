import { Module } from '@nestjs/common';
import { CreateCategoryFeature } from './create-category.feature';
import { CategoriesRepository } from '../../../database/repositories/category.repository';

@Module({
  providers: [CreateCategoryFeature, CategoriesRepository],
  exports: [CreateCategoryFeature],
})
export class CreateCategoryModule {}
