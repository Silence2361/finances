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

  async execute(params: GetUsersFeatureParams): Promise<GetUsersFeatureResult> {
    const { page = 1, pageSize = 10 } = params;

    const offset = (page - 1) * pageSize;

    const users: IUser[] = await this.userRepository.findAllUsers({
      offset,
      limit: pageSize,
    });

    const count = await this.userRepository.usersCount();
    return {
      docs: users.map(({ id, email, role }) => ({
        id,
        email,
        role,
      })),
      count,
    };
  }
}
