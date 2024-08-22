import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../database/users/user.repository';
import {
  GetUsersFeatureParams,
  GetUsersFeatureResult,
} from './get-users.types';
import { IUser } from '../../../database/users/user.interface';
import { PaginationQueryDto } from '../../../rest/users/dto/pagination-query.dto';

@Injectable()
export class GetUsersFeature {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(params: PaginationQueryDto): Promise<GetUsersFeatureResult[]> {
    const { page = 1, pageSize = 10 } = params;

    const offset = (page - 1) * pageSize;

    const users: IUser[] = await this.userRepository.findAllUsers({
      offset,
      limit: pageSize,
    });

    return users.map(({ id, email, role }) => ({
      id,
      email,
      role,
    }));
  }
}
