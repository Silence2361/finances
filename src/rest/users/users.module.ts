import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { User } from '../../database/users-database/users.model';
import { UserController } from './users.controller';
import { UsersRepository } from '../../database/repositories/user.repository';
import { DatabaseModule } from '../../database/repositories/repositories.module';
import { FeaturesModule } from '../../features/features.module';

@Module({
  imports: [ObjectionModule.forFeature([User]), DatabaseModule, FeaturesModule],
  providers: [UsersRepository],
  controllers: [UserController],
  exports: [ObjectionModule, UsersRepository],
})
export class UsersModule {}
