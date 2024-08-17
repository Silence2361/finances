import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { User } from '../../database/users-database/users.model';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { UsersRepository } from '../../database/repositories/user.repository';
import { DatabaseModule } from '../../database/repositories/repositories.module';
import { UsersQueryService } from './query.service';

@Module({
  imports: [ObjectionModule.forFeature([User]), DatabaseModule],
  providers: [UserService, UsersRepository, UsersQueryService],
  controllers: [UserController],
  exports: [ObjectionModule, UsersRepository],
})
export class UsersModule {}
