import { Module } from '@nestjs/common';
import { FindTotalStatisticsFeature } from './find-total-statistics.feature';
import { FinancesRepository } from '../../../database/finances/finance.repository';

@Module({
  providers: [FindTotalStatisticsFeature, FinancesRepository],
  exports: [FindTotalStatisticsFeature],
})
export class FindTotalStatisticsModule {}
