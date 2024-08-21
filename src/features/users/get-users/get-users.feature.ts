import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../database/users/user.repository';
import {
  GetUsersFeatureParams,
  GetUsersFeatureResult,
} from './get-users.types';
import { IUser } from '../../../database/users/user.interface';

@Injectable()
export class GetUsersFeature {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(
    params: GetUsersFeatureParams,
  ): Promise<GetUsersFeatureResult[]> {
    const users: IUser[] = await this.userRepository.findAllUsers();
    return users.map(({ id, email, role }) => ({
      id,
      email,
      role,
    }));
  }
}
