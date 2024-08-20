import { Module } from '@nestjs/common';
import { UpdateFinanceByIdFeature } from './update-finance-by-id.feature';
import { FinancesRepository } from '../../../database/repositories/finance.repository';
import { CategoriesRepository } from '../../../database/repositories/category.repository';

@Module({
  providers: [
    UpdateFinanceByIdFeature,
    FinancesRepository,
    CategoriesRepository,
  ],
  exports: [UpdateFinanceByIdFeature],
})
export class UpdateFinanceByIdModule {}
