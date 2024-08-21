import { Module } from '@nestjs/common';
import { FinancesController } from './finances.controller';
import { FeaturesModule } from '../../features/features.module';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule, FeaturesModule],
  controllers: [FinancesController],
})
export class FinancesModule {}
