import { Module } from '@nestjs/common';
import { GetFinancesFeature } from './get-finances.feature';

@Module({
  providers: [GetFinancesFeature],
  exports: [GetFinancesFeature],
})
export class FindFinancesModule {}
