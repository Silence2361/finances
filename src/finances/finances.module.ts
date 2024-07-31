import { Module } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { ObjectionModule } from 'nestjs-objection/dist';
import { Finance } from './finances.model';
import { FinancesController } from './finances.controller';

@Module({
  imports: [ObjectionModule.forFeature([Finance])],
  providers: [FinancesService],
  controllers: [FinancesController],
  exports: [FinancesService],
})
export class FinancesModule {}
