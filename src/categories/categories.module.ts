import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { Category } from './categories.model';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { DatabaseModule } from '../repositories/repositories.module';
import { CategoriesRepository } from '../repositories/category.repository';

@Module({
  imports: [ObjectionModule.forFeature([Category]), DatabaseModule],
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
  exports: [ObjectionModule, CategoriesRepository],
})
export class CategoriesModule {}
