import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { DatabaseModule } from '../../database/database.module';
import { FeaturesModule } from '../../features/features.module';

@Module({
  imports: [DatabaseModule, FeaturesModule],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
