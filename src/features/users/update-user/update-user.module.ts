import { Module } from '@nestjs/common';
import { UpdateUserFeature } from './update-user.feature';
import { UsersRepository } from '../../../database/repositories/user.repository';

@Module({
  providers: [UpdateUserFeature, UsersRepository],
  exports: [UpdateUserFeature],
})
export class UpdateUserModule {}
