import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { FeaturesModule } from '../../features/features.module';
import { CategoryResolver } from './categories.controller';

@Module({
  imports: [DatabaseModule, FeaturesModule],
  providers: [CategoryResolver],
})
export class CategoriesModule {}
