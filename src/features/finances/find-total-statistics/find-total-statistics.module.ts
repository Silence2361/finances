import { Module } from '@nestjs/common';
import { FindTotalStatisticsFeature } from './find-total-statistics.feature';

@Module({
  providers: [FindTotalStatisticsFeature],
  exports: [FindTotalStatisticsFeature],
})
export class FindTotalStatisticsModule {}
