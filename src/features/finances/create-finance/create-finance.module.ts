import { Module } from '@nestjs/common';
import { CreateFinanceFeature } from './create-finance.feature';
import { FinancesRepository } from '../../../database/repositories/finance.repository';
import { CategoriesRepository } from '../../../database/repositories/category.repository';

@Module({
  providers: [CreateFinanceFeature, FinancesRepository, CategoriesRepository],
  exports: [CreateFinanceFeature],
})
export class CreateFinanceModule {}
