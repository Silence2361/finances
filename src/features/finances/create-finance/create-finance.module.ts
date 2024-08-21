import { Module } from '@nestjs/common';
import { CreateFinanceFeature } from './create-finance.feature';

@Module({
  providers: [CreateFinanceFeature],
  exports: [CreateFinanceFeature],
})
export class CreateFinanceModule {}
