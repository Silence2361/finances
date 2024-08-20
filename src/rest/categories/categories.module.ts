import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { Category } from '../../database/categories-database/categories.model';
import { CategoriesController } from './categories.controller';
import { DatabaseModule } from '../../database/repositories/repositories.module';
import { CategoriesRepository } from '../../database/repositories/category.repository';
import { FeaturesModule } from '../../features/features.module';

@Module({
  imports: [
    ObjectionModule.forFeature([Category]),
    DatabaseModule,
    FeaturesModule,
  ],
  providers: [CategoriesRepository],
  controllers: [CategoriesController],
  exports: [ObjectionModule, CategoriesRepository],
})
export class CategoriesModule {}
