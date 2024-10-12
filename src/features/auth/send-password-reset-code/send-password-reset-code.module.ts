import { Module } from '@nestjs/common';
import { SendPasswordResetCodeFeature } from './send-password-reset-code.feature';

@Module({
  providers: [SendPasswordResetCodeFeature],
  exports: [SendPasswordResetCodeFeature],
})
export class SendPasswordResetCodeModule {}
