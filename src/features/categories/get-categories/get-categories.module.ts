import { Module } from '@nestjs/common';
import { GetCategoriesFeature } from './get-categories.feature';

@Module({
  providers: [GetCategoriesFeature],
  exports: [GetCategoriesFeature],
})
export class GetCategoriesModule {}
