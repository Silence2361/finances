import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../../database/users/user.repository';
import {
  GetUserByIdFeatureParams,
  GetUserByIdFeatureResult,
} from './get-user-by-id.types';
import { IUser } from '../../../database/users/user.interface';

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

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
