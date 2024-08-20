import { Module } from '@nestjs/common';
import { CreateUserFeature } from './create-user.feature';
import { UsersRepository } from '../../../database/repositories/user.repository';

@Module({
  providers: [CreateUserFeature, UsersRepository],
  exports: [CreateUserFeature],
})
export class CreateUserModule {}
