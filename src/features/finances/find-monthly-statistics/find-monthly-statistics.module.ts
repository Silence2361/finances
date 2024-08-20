import { Module } from '@nestjs/common';
import { FindMonthlyStatisticsFeature } from './find-monthly-statistics.feature';
import { FinancesRepository } from '../../../database/repositories/finance.repository';

@Module({
  providers: [FindMonthlyStatisticsFeature, FinancesRepository],
  exports: [FindMonthlyStatisticsFeature],
})
export class FindMonthlyStatisticsModule {}
