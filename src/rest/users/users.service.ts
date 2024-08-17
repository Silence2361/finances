import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {
  ICreateUser,
  IUpdateUser,
  IUser,
  IUserDetails,
  IUserResponse,
} from '../../database/users-database/interfaces/user.interface';
import { UsersRepository } from '../../database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUser: ICreateUser): Promise<IUserResponse> {
    const existingUser = await this.usersRepository.findUserByEmail(
      createUser.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(createUser.password, 10);

    const user: IUser = await this.usersRepository.createUser({
      ...createUser,
      password: hashedPassword,
    });
    return { id: user.id };
  }

  async updateUserById(
    id: number,
    updateUser: IUpdateUser,
  ): Promise<IUserDetails> {
    if (updateUser.password) {
      updateUser.password = await bcrypt.hash(updateUser.password, 10);
    }

    const user: IUser | null = await this.usersRepository.updateUserById(
      id,
      updateUser,
    );
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async deleteUserById(id: number): Promise<void> {
    const user = await this.usersRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.usersRepository.deleteUserById(id);
  }
}
