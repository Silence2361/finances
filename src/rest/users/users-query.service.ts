import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../database/repositories/user.repository';
import {
  IUser,
  IUserDetails,
} from '../../database/users-database/interfaces/user.interface';

@Injectable()
export class UsersQueryService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findAllUsers(): Promise<IUserDetails[]> {
    const users: IUser[] = await this.userRepository.findAllUsers();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      role: user.role,
    }));
  }

  async findUserById(id: number): Promise<IUserDetails | null> {
    const user: IUser | null = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async findUserByEmail(email: string): Promise<IUserDetails | null> {
    const user: IUser | null = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
