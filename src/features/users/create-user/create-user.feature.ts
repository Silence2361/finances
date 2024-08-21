import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '../../../database/users/user.repository';

import {
  CreateUserFeatureParams,
  CreateUserFeatureResult,
} from './create-user.types';
import { IUser } from '../../../database/users/user.interface';

@Injectable()
export class CreateUserFeature {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    params: CreateUserFeatureParams,
  ): Promise<CreateUserFeatureResult> {
    const { email, role, password } = params;

    const existingUser = await this.usersRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await this.usersRepository.createUser({
      email,
      password: hashedPassword,
      role,
    });
    return { id: user.id };
  }
}
