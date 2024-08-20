import { Module } from '@nestjs/common';
import { GetCategoryByIdFeature } from './get-category-by-id.feature';

@Module({
  providers: [GetCategoryByIdFeature],
  exports: [GetCategoryByIdFeature],
})
export class GetCategoryByIdModule {}
