import { Module } from '@nestjs/common';
import { LoginUserFeature } from './login-user.feature';

@Module({
  providers: [LoginUserFeature],
  exports: [LoginUserFeature],
})
export class LoginUserModule {}
