import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection/dist';
import { Finance } from '../../database/finances/finances.model';
import { FinancesController } from './finances.controller';
import { FeaturesModule } from '../../features/features.module';
import { FinancesRepository } from '../../database/finances/finance.repository';

@Module({
  imports: [ObjectionModule.forFeature([Finance]), FeaturesModule],
  providers: [FinancesRepository],
  controllers: [FinancesController],
  exports: [ObjectionModule, FinancesRepository],
})
export class FinancesModule {}
