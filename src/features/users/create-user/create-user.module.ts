import { Module } from '@nestjs/common';
import { CreateUserFeature } from './create-user.feature';

@Module({
  providers: [CreateUserFeature],
  exports: [CreateUserFeature],
})
export class CreateUserModule {}
