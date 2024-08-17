import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { Category } from '../../database/categories-database/categories.model';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { DatabaseModule } from '../../database/repositories/repositories.module';
import { CategoriesRepository } from '../../database/repositories/category.repository';
import { CategoriesQueryService } from './categories-query.service';

@Module({
  imports: [ObjectionModule.forFeature([Category]), DatabaseModule],
  providers: [CategoriesService, CategoriesRepository, CategoriesQueryService],
  controllers: [CategoriesController],
  exports: [ObjectionModule, CategoriesRepository],
})
export class CategoriesModule {}
