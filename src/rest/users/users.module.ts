import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { FeaturesModule } from '../../features/features.module';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule, FeaturesModule],
  controllers: [UserController],
})
export class UsersModule {}
