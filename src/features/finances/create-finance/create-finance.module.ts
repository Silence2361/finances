import { Module } from '@nestjs/common';
import { CreateFinanceFeature } from './create-finance.feature';
import { FinancesRepository } from '../../../database/finances/finance.repository';
import { CategoriesRepository } from '../../../database/categories/category.repository';

@Module({
  providers: [CreateFinanceFeature, FinancesRepository, CategoriesRepository],
  exports: [CreateFinanceFeature],
})
export class CreateFinanceModule {}
