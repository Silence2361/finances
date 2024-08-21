import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  LoginUserFeatureParams,
  LoginUserFeatureResult,
} from './login-user.types';
import { UsersRepository } from '../../../database/users/user.repository';

@Injectable()
export class LoginUserFeature {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    params: LoginUserFeatureParams,
  ): Promise<LoginUserFeatureResult> {
    const { email, password } = params;

    const user = await this.usersRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong Password');
    }
    const { id, role } = user;
    const payload = { userId: id, role };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
