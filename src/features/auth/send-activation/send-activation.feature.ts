import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailFeatureParams } from './send-activation.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerFeature {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async execute(mailFeatureParams: MailFeatureParams): Promise<void> {
    const { email, activationCode } = mailFeatureParams;

    const mailOptions = {
      from: this.configService.get<string>('MAIL_USER'),
      to: email,
      subject: 'Account activation',
      text: `Your activation code: ${activationCode}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
