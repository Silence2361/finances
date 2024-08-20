import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '../../../database/users-database/interfaces/user.interface';
import { UsersRepository } from '../../../database/repositories/user.repository';
import {
  GetUserByIdFeatureParams,
  GetUserByIdFeatureResult,
} from './get-user-by-id.types';

@Injectable()
export class GetUserByIdFeature {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    params: GetUserByIdFeatureParams,
  ): Promise<GetUserByIdFeatureResult | null> {
    const { id } = params;

    const user: IUser | null = await this.usersRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const { id: userId, email, role } = user;
    return {
      id: userId,
      email,
      role,
    };
  }
}
