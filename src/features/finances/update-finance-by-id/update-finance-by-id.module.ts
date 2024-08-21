import { Module } from '@nestjs/common';
import { UpdateFinanceByIdFeature } from './update-finance-by-id.feature';
import { FinancesRepository } from '../../../database/finances/finance.repository';
import { CategoriesRepository } from '../../../database/categories/category.repository';

@Module({
  providers: [
    UpdateFinanceByIdFeature,
    FinancesRepository,
    CategoriesRepository,
  ],
  exports: [UpdateFinanceByIdFeature],
})
export class UpdateFinanceByIdModule {}
