import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { User } from '../users/users.model';
import { ModelClass } from 'objection';
import {
  ICreateUser,
  IUpdateUser,
  IUser,
} from '../users/interfaces/user.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User) private readonly userModel: ModelClass<User>,
  ) {}

  async createUser(createUser: ICreateUser): Promise<IUser> {
    return this.userModel.query().insert(createUser);
  }

  async findAllUsers(): Promise<IUser[]> {
    const users: IUser[] = await this.userModel.query();
    return users;
  }

  async findUserById(id: number): Promise<IUser | null> {
    const user: IUser | null = await this.userModel.query().findById(id);
    return user;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    const user: IUser | null = await this.userModel.query().findOne({ email });
    return user;
  }

  async updateUserById(
    id: number,
    updateUser: IUpdateUser,
  ): Promise<IUser | null> {
    const user: IUser | null = await this.userModel
      .query()
      .patchAndFetchById(id, updateUser);
    return user;
  }

  async deleteUserById(id: number): Promise<void> {
    await this.userModel.query().deleteById(id);
  }
}
