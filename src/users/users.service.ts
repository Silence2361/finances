import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { updateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcryptjs';
import { IUser } from './interfaces/user.interface';
import { UsersRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const existingUser = await this.userRepository.findUserByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
    try {
      const user: IUser = await this.userRepository.createUser(createUserDto);
      delete user.password;
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAllUsers(): Promise<IUser[]> {
    try {
      const users: IUser[] = await this.userRepository.findAllUsers();
      for (let i = 0; i < users.length; i++) {
        delete users[i].password;
      }
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findUserById(id: number): Promise<IUser | null> {
    try {
      const user: IUser | null = await this.userRepository.findUserById(id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user: IUser | null =
        await this.userRepository.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      delete user.password;
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async updateUserById(
    id: number,
    updateUserDto: updateUserDto,
  ): Promise<IUser> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    try {
      const user: IUser = await this.userRepository.updateUserById(
        id,
        updateUserDto,
      );
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      delete user.password;
      return user;
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
