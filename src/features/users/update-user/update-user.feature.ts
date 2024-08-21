import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../../database/users/user.repository';
import * as bcrypt from 'bcryptjs';
import {
  UpdateUserFeatureParams,
  UpdateUserFeatureResult,
} from './update-user.types';
import { IUser } from '../../../database/users/user.interface';

@Injectable()
export class UpdateUserFeature {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    userId: number,
    params: UpdateUserFeatureParams,
  ): Promise<UpdateUserFeatureResult> {
    const { email, role, password } = params;

    let hashedPassword: string | undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUserData = {
      email,
      role,
      password: hashedPassword || password,
    };

    const user: IUser = await this.usersRepository.updateUserById(
      userId,
      updatedUserData,
    );

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
