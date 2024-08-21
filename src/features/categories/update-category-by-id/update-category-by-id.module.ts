import { Module } from '@nestjs/common';
import { UpdateCategoryByIdFeature } from './update-category-by-id.feature';

@Module({
  providers: [UpdateCategoryByIdFeature],
  exports: [UpdateCategoryByIdFeature],
})
export class UpdateCategoryByIdModule {}
