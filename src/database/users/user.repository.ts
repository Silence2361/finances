import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { User } from './users.model';
import { ModelClass } from 'objection';
import { ICreateUser, IUpdateUser, IUser, IUsersCount } from './user.interface';
import { castTo } from '../../common/utils/type-utils';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User) private readonly userModel: ModelClass<User>,
  ) {}

  async createUser(createUser: ICreateUser): Promise<IUser> {
    return this.userModel.query().insert(createUser);
  }

  async findAllUsers(paginationOptions: {
    offset: number;
    limit: number;
  }): Promise<IUser[]> {
    return await this.userModel
      .query()
      .offset(paginationOptions.offset)
      .limit(paginationOptions.limit);
  }

  async findUserById(userId: number): Promise<IUser | null> {
    return this.userModel.query().findById(userId);
  }

  async usersCount(): Promise<number> {
    const result = await this.userModel
      .query()
      .count('id as count')
      .castTo<IUsersCount[]>();

    return result[0].count;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return this.userModel.query().findOne({ email });
  }

  async updateUserById(userId: number, updateUser: IUpdateUser): Promise<void> {
    await this.userModel.query().patchAndFetchById(userId, updateUser);
  }

  async deleteUserById(userId: number): Promise<void> {
    await this.userModel.query().deleteById(userId);
  }
}
