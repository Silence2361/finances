import { Module } from '@nestjs/common';
import { GetTotalStatisticsFeature } from './get-total-statistics.feature';

@Module({
  providers: [GetTotalStatisticsFeature],
  exports: [GetTotalStatisticsFeature],
})
export class GetTotalStatisticsModule {}
