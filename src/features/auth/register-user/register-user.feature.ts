import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {
  RegisterUserFeatureParams,
  RegisterUserFeatureResult,
} from './register-user.types';
import { IUser } from '../../../database/users/user.interface';
import { UsersRepository } from '../../../database/users/user.repository';
import { UserRole } from '../../../database/users/users.model';
import { MailerFeature } from '../send-activation/send-activation.feature';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RegisterUserFeature {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailerFeature: MailerFeature,
  ) {}

  async execute(
    params: RegisterUserFeatureParams,
  ): Promise<RegisterUserFeatureResult> {
    const { email, password } = params;

    const existingUser = await this.usersRepository.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const activationCode = uuidv4();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await this.usersRepository.createUser({
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    await this.mailerFeature.execute({ email, activationCode });

    return { id: user.id, email: user.email, role: user.role };
  }
}
