import { Module } from '@nestjs/common';
import { DeleteFinanceByIdFeature } from './delete-finance-by-id.feature';
import { FinancesRepository } from '../../../database/finances/finance.repository';

@Module({
  providers: [DeleteFinanceByIdFeature, FinancesRepository],
  exports: [DeleteFinanceByIdFeature],
})
export class DeleteFinanceByIdModule {}
