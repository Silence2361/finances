import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../../database/users/user.repository';
import {
  DeleteUserByIdFeatureParams,
  DeleteUserByIdFeatureResult,
} from './delete-user-by-id.types';

@Injectable()
export class DeleteUserByIdFeature {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(
    params: DeleteUserByIdFeatureParams,
  ): Promise<DeleteUserByIdFeatureResult> {
    const { id } = params;

    const user = await this.usersRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.usersRepository.deleteUserById(id);

    return { success: true };
  }
}
