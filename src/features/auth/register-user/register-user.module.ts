import { Module } from '@nestjs/common';
import { RegisterUserFeature } from './register-user.feature';
import { MailerFeature } from '../send-activation/send-activation.feature';

@Module({
  providers: [RegisterUserFeature, MailerFeature],
  exports: [RegisterUserFeature],
})
export class RegisterUserModule {}
