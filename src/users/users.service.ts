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
} from './interfaces/user.interface';
import { UsersRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(createUser: ICreateUser): Promise<IUserResponse> {
    const existingUser = await this.userRepository.findUserByEmail(
      createUser.email,
    );
    if (!existingUser) {
      throw new ConflictException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(createUser.password, 10);

    const user: IUser = await this.userRepository.createUser({
      ...createUser,
      password: hashedPassword,
    });
    return { id: user.id };
  }

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

  async updateUserById(
    id: number,
    updateUser: IUpdateUser,
  ): Promise<IUserDetails> {
    if (updateUser.password) {
      updateUser.password = await bcrypt.hash(updateUser.password, 10);
    }

    const user: IUser | null = await this.userRepository.updateUserById(
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
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.deleteUserById(id);
  }
}
