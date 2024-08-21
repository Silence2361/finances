import { Module } from '@nestjs/common';
import { CreateCategoryFeature } from './create-category.feature';

@Module({
  providers: [CreateCategoryFeature],
  exports: [CreateCategoryFeature],
})
export class CreateCategoryModule {}
