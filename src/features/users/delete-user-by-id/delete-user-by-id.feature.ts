import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../../database/users/user.repository';
import { DeleteUserByIdFeatureParams } from './delete-user-by-id.types';

@Injectable()
export class DeleteUserByIdFeature {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(params: DeleteUserByIdFeatureParams): Promise<void> {
    const { id } = params;

    const user = await this.usersRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.usersRepository.deleteUserById(id);
  }
}
