import { Module } from '@nestjs/common';
import { UpdateFinanceByIdFeature } from './update-finance-by-id.feature';

@Module({
  providers: [UpdateFinanceByIdFeature],
  exports: [UpdateFinanceByIdFeature],
})
export class UpdateFinanceByIdModule {}
