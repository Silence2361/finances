import { Module } from '@nestjs/common';
import { FinancesRepository } from '../../../database/repositories/finance.repository';
import { FindTotalStatisticsFeature } from './find-total-statistics.feature';

@Module({
  providers: [FindTotalStatisticsFeature, FinancesRepository],
  exports: [FindTotalStatisticsFeature],
})
export class FindTotalStatisticsModule {}
