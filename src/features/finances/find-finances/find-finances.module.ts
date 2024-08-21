import { Module } from '@nestjs/common';
import { FindFinancesFeature } from './find-finances.feature';

@Module({
  providers: [FindFinancesFeature],
  exports: [FindFinancesFeature],
})
export class FindFinancesModule {}
