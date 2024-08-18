import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {
  ICreateUser,
  ICreateUserResponse,
  IUpdateUser,
  IUpdateUserResponse,
  IUser,
} from '../../database/users-database/interfaces/user.interface';
import { UsersRepository } from '../../database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserData: ICreateUser): Promise<ICreateUserResponse> {
    const { email, role, password } = createUserData;
    const existingUser = await this.usersRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await this.usersRepository.createUser({
      email,
      password: hashedPassword,
      role,
    });
    return { id: user.id };
  }

  async updateUserById(
    userId: number,
    updateUserData: IUpdateUser,
  ): Promise<IUpdateUserResponse> {
    const { email, role, password } = updateUserData;

    let hashedPassword: string | undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUserData = {
      email,
      role,
      password: hashedPassword || password,
    };

    const user: IUser | null = await this.usersRepository.updateUserById(
      userId,
      updatedUserData,
    );
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async deleteUserById(userId: number): Promise<void> {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    await this.usersRepository.deleteUserById(userId);
  }
}
