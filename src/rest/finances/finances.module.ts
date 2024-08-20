import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection/dist';
import { Finance } from '../../database/finances-database/finances.model';
import { FinancesController } from './finances.controller';
import { FinancesRepository } from '../../database/repositories/finance.repository';
import { FeaturesModule } from '../../features/features.module';

@Module({
  imports: [ObjectionModule.forFeature([Finance]), FeaturesModule],
  providers: [FinancesRepository],
  controllers: [FinancesController],
  exports: [ObjectionModule, FinancesRepository],
})
export class FinancesModule {}
