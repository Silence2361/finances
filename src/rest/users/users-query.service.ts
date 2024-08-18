import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../database/repositories/user.repository';
import {
  IFindAllUsersResponse,
  IFindUserByEmailResponse,
  IFindUserByIdResponse,
  IUser,
} from '../../database/users-database/interfaces/user.interface';

@Injectable()
export class UsersQueryService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findAllUsers(): Promise<IFindAllUsersResponse[]> {
    const users: IUser[] = await this.userRepository.findAllUsers();
    return users.map(({ id, email, role }) => ({
      id,
      email,
      role,
    }));
  }

  async findUserById(id: number): Promise<IFindUserByIdResponse | null> {
    const user: IUser | null = await this.userRepository.findUserById(id);
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

  async findUserByEmail(
    email: string,
  ): Promise<IFindUserByEmailResponse | null> {
    const user: IUser | null = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    const { id, role } = user;
    return {
      id,
      email,
      role,
    };
  }
}
