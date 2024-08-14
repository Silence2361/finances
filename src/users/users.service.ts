import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
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
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(createUser.password, 10);

    try {
      const user: IUser = await this.userRepository.createUser({
        ...createUser,
        password: hashedPassword,
      });
      return { id: user.id };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAllUsers(): Promise<IUserDetails[]> {
    try {
      const users: IUser[] = await this.userRepository.findAllUsers();
      return users.map((user) => ({
        id: user.id,
        email: user.email,
        role: user.role,
      }));
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findUserById(id: number): Promise<IUserDetails | null> {
    try {
      const user: IUser | null = await this.userRepository.findUserById(id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async findUserByEmail(email: string): Promise<IUserDetails | null> {
    try {
      const user: IUser | null =
        await this.userRepository.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }

      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async updateUserById(
    id: number,
    updateUser: IUpdateUser,
  ): Promise<IUserDetails> {
    if (updateUser.password) {
      updateUser.password = await bcrypt.hash(updateUser.password, 10);
    }
    try {
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
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async deleteUserById(id: number): Promise<void> {
    try {
      const user = await this.userRepository.findUserById(id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      await this.userRepository.deleteUserById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
