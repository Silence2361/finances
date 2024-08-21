import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import {
  RegisterUserFeatureParams,
  RegisterUserFeatureResult,
} from './register-user.types';
import { IUser } from '../../../database/users/user.interface';
import { UsersRepository } from '../../../database/users/user.repository';
import { UserRole } from '../../../database/users/users.model';

@Injectable()
export class RegisterUserFeature {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    params: RegisterUserFeatureParams,
  ): Promise<RegisterUserFeatureResult> {
    const { email, password } = params;

    const existingUser = await this.usersRepository.findUserByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await this.usersRepository.createUser({
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });

    return { id: user.id, email: user.email, role: user.role };
  }
}
