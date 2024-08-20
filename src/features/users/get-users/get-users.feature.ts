import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../database/repositories/user.repository';
import { IUser } from '../../../database/users-database/interfaces/user.interface';
import {
  GetUsersFeatureParams,
  GetUsersFeatureResult,
} from './get-users.types';

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
