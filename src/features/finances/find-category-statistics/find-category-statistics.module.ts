import { Module } from '@nestjs/common';
import { FindCategoryStatisticsFeature } from './find-category-statistics.feature';
import { FinancesRepository } from '../../../database/repositories/finance.repository';

@Module({
  providers: [FindCategoryStatisticsFeature, FinancesRepository],
  exports: [FindCategoryStatisticsFeature],
})
export class FindCategoryStatisticsModule {}
