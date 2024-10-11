import { Module } from '@nestjs/common';
import { MailerFeature } from './send-activation.feature';

@Module({
  providers: [MailerFeature],
  exports: [MailerFeature],
})
export class MailerFeatureModule {}
