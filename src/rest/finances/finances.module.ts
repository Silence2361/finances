import { Module } from '@nestjs/common';
import { FeaturesModule } from '../../features/features.module';
import { DatabaseModule } from '../../database/database.module';
import { FinancesResolver } from './finances.controller';

@Module({
  imports: [DatabaseModule, FeaturesModule],
  providers: [FinancesResolver],
})
export class FinancesModule {}
