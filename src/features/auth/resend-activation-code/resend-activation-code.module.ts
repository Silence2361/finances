import { Module } from '@nestjs/common';
import { ResendActivationCodeFeature } from './resend-activation-code.feature';

@Module({
  providers: [ResendActivationCodeFeature],
  exports: [ResendActivationCodeFeature],
})
export class ResendActivationCodeModule {}
