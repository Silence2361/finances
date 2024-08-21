import { Module } from '@nestjs/common';
import { FindCategoryStatisticsFeature } from './find-category-statistics.feature';

@Module({
  providers: [FindCategoryStatisticsFeature],
  exports: [FindCategoryStatisticsFeature],
})
export class FindCategoryStatisticsModule {}
