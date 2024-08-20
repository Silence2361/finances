import { Module } from '@nestjs/common';
import { DeleteCategoryByIdFeature } from './delete-category-by-id.features';

@Module({
  providers: [DeleteCategoryByIdFeature],
  exports: [DeleteCategoryByIdFeature],
})
export class DeleteCategoryByIdModule {}
