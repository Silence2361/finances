import { Module } from '@nestjs/common';
import { FindMonthlyStatisticsFeature } from './find-monthly-statistics.feature';

@Module({
  providers: [FindMonthlyStatisticsFeature],
  exports: [FindMonthlyStatisticsFeature],
})
export class FindMonthlyStatisticsModule {}
