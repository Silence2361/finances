import { Module } from '@nestjs/common';
import { UpdateUserModule } from './users/update-user/update-user.module';
import { CreateUserModule } from './users/create-user/create-user.module';
import { GetUsersModule } from './users/get-users/get-users.module';
import { GetUserByIdModule } from './users/get-user-by-id/get-user-by-id.module';
import { DeleteUserByIdModule } from './users/delete-user-by-id/delete-user-by-id.module';

@Module({
  imports: [
    CreateUserModule,
    UpdateUserModule,
    GetUsersModule,
    GetUserByIdModule,
    DeleteUserByIdModule,
  ],
  exports: [
    CreateUserModule,
    UpdateUserModule,
    GetUsersModule,
    GetUserByIdModule,
    DeleteUserByIdModule,
  ],
})
export class FeaturesModule {}
