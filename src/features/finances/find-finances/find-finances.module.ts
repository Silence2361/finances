import { Module } from '@nestjs/common';
import { FindFinancesFeature } from './find-finances.feature';
import { FinancesRepository } from '../../../database/finances/finance.repository';

@Module({
  providers: [FindFinancesFeature, FinancesRepository],
  exports: [FindFinancesFeature],
})
export class FindFinancesModule {}
