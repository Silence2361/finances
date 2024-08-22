import { Module } from '@nestjs/common';
import { GetMonthlyStatisticsFeature } from './get-monthly-statistics.feature';

@Module({
  providers: [GetMonthlyStatisticsFeature],
  exports: [GetMonthlyStatisticsFeature],
})
export class GetMonthlyStatisticsModule {}
