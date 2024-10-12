import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { UsersRepository } from '../../../database/users/user.repository';
import { SendPasswordResetCodeParams } from './send-password-reset-code.types';

@Injectable()
export class SendPasswordResetCodeFeature {
  private transporter;
  constructor(
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async execute(params: SendPasswordResetCodeParams): Promise<void> {
    const { email } = params;

    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetPassword = uuidv4();

    await this.usersRepository.updateUserById(user.id, {
      resetPasswordCode: resetPassword,
    });

    const mailOptions = {
      from: this.configService.get<string>('MAIL_USER'),
      to: email,
      subject: 'Password Reset',
      text: `Your password reset code: ${resetPassword}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
