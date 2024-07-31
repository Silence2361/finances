import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { User } from './users.model';
import { ModelClass } from 'objection';


@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: ModelClass<User>) {}


  async findByEmail(email: string): Promise<User> {
    return this.userModel.query().findOne({ email });
  }
}
