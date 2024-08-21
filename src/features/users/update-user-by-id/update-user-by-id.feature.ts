import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../../database/users/user.repository';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../../../database/users/user.interface';
import { UpdateUserByIdFeatureParams } from './update-user-by-id.types';

@Injectable()
export class UpdateUserByIdFeature {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    userId: number,
    params: UpdateUserByIdFeatureParams,
  ): Promise<void> {
    const { email, role, password } = params;

    const user: IUser | null = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    let hashedPassword: string | undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUserData = {
      email,
      role,
      password: hashedPassword || password,
    };

    await this.usersRepository.updateUserById(userId, updatedUserData);
  }
}
