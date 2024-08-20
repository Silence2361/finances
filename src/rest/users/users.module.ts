import { Module } from '@nestjs/common';
import { ObjectionModule } from 'nestjs-objection';
import { User } from '../../database/users-database/users.model';
import { UserController } from './users.controller';
import { UsersRepository } from '../../database/repositories/user.repository';
import { DatabaseModule } from '../../database/repositories/repositories.module';
import { CreateUserModule } from '../../features/users/create-user/create-user.module';
import { UpdateUserModule } from '../../features/users/update-user/update-user.module';
import { GetUsersModule } from '../../features/users/get-users/get-users.module';
import { GetUserByIdModule } from '../../features/users/get-user-by-id/get-user-by-id.module';
import { DeleteUserByIdModule } from '../../features/users/delete-user-by-id/delete-user-by-id.module';

@Module({
  imports: [
    ObjectionModule.forFeature([User]),
    DatabaseModule,
    CreateUserModule,
    UpdateUserModule,
    GetUsersModule,
    GetUserByIdModule,
    DeleteUserByIdModule,
  ],
  providers: [UsersRepository],
  controllers: [UserController],
  exports: [
    CreateUserModule,
    UpdateUserModule,
    ObjectionModule,
    UsersRepository,
  ],
})
export class UsersModule {}
