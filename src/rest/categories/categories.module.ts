import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { Category } from '../../database/categories/categories.model';
import { CategoriesController } from './categories.controller';
import { DatabaseModule } from '../../database/database.module';
import { FeaturesModule } from '../../features/features.module';
import { CategoriesRepository } from '../../database/categories/category.repository';

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
