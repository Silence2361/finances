import { Module } from '@nestjs/common';
import { GetCategoryStatisticsFeature } from './get-category-statistics.feature';

@Module({
  providers: [GetCategoryStatisticsFeature],
  exports: [GetCategoryStatisticsFeature],
})
export class GetCategoryStatisticsModule {}
