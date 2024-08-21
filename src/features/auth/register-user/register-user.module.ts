import { Module } from '@nestjs/common';
import { RegisterUserFeature } from './register-user.feature';

@Module({
  providers: [RegisterUserFeature],
  exports: [RegisterUserFeature],
})
export class RegisterUserModule {}
