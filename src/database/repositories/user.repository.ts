import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { User } from '../users-database/users.model';
import { ModelClass } from 'objection';
import {
  ICreateUser,
  IUpdateUser,
  IUser,
} from '../users-database/interfaces/user.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User) private readonly userModel: ModelClass<User>,
  ) {}

  async createUser(createUser: ICreateUser): Promise<IUser> {
    return this.userModel.query().insert(createUser);
  }

  async findAllUsers(): Promise<IUser[]> {
    return this.userModel.query();
  }

  async findUserById(id: number): Promise<IUser | null> {
    return this.userModel.query().findById(id);
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return this.userModel.query().findOne({ email });
  }

  async updateUserById(
    id: number,
    updateUser: IUpdateUser,
  ): Promise<IUser | null> {
    return this.userModel.query().patchAndFetchById(id, updateUser);
  }

  async deleteUserById(id: number): Promise<void> {
    await this.userModel.query().deleteById(id);
  }
}
