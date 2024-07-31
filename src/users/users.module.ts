import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { User } from './users.model';
import { UserService } from './users.service';
import { UserController } from './users.controller';


@Module({
  imports: [ObjectionModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [ObjectionModule, UserService]
})
export class UsersModule {}
