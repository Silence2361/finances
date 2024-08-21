import { Module } from '@nestjs/common';
import { DeleteFinanceByIdFeature } from './delete-finance-by-id.feature';

@Module({
  providers: [DeleteFinanceByIdFeature],
  exports: [DeleteFinanceByIdFeature],
})
export class DeleteFinanceByIdModule {}
