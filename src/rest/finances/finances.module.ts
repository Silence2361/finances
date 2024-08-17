import { Module } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { ObjectionModule } from 'nestjs-objection/dist';
import { Finance } from '../../database/finances-database/finances.model';
import { FinancesController } from './finances.controller';
import { FinancesRepository } from '../../database/repositories/finance.repository';

@Module({
  imports: [ObjectionModule.forFeature([Finance])],
  providers: [FinancesService, FinancesRepository],
  controllers: [FinancesController],
  exports: [ObjectionModule, FinancesRepository],
})
export class FinancesModule {}
