import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../../database/users/user.repository';
import { ResendActivationCodeParams } from './resend-activation-code.types';
import * as nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResendActivationCodeFeature {
  private transporter;

  constructor(
    private readonly userRepostitory: UsersRepository,
    private readonly configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async execute(params: ResendActivationCodeParams): Promise<void> {
    const { email } = params;

    const user = await this.userRepostitory.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newActivationCode = uuidv4();

    await this.userRepostitory.updateUserById(user.id, {
      activationCode: newActivationCode,
    });

    const mailOptions = {
      from: this.configService.get<string>('MAIL_USER'),
      to: email,
      subject: 'Resend Activation Code',
      text: `Your new activation code: ${newActivationCode}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
