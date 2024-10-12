import { Module } from '@nestjs/common';
import { ResetPasswordFeature } from './reset-password.feature';

@Module({
  providers: [ResetPasswordFeature],
  exports: [ResetPasswordFeature],
})
export class ResetPasswordModule {}
