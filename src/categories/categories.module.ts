import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { Category } from './categories.model';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [ObjectionModule.forFeature([Category])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
  exports: [ObjectionModule, ],
  
})
export class CategoriesModule {}