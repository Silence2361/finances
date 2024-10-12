import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../../../database/users/user.repository';
import { ResetPasswordParams } from './reset-password.types';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ResetPasswordFeature {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(params: ResetPasswordParams): Promise<void> {
    const { email, newPassword, resetCode } = params;

    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.resetPasswordCode !== resetCode) {
      throw new BadRequestException('Invalid reset code');
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);

    if (isSamePassword) {
      throw new BadRequestException(
        'New password cannot be the same as the current password',
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.usersRepository.updateUserById(user.id, {
      password: hashedPassword,
      resetPasswordCode: null,
    });
  }
}
