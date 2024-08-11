import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { User } from './users.model';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { UsersRepository } from '../repositories/user.repository';
import { DatabaseModule } from '../repositories/repositories.module';

@Module({
  imports: [ObjectionModule.forFeature([User]), DatabaseModule],
  providers: [UserService, UsersRepository],
  controllers: [UserController],
  exports: [ObjectionModule, UsersRepository],
})
export class UsersModule {}
