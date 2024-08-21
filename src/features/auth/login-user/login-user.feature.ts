import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
      throw new NotFoundException('User not found');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong Password');
    }
    const payload = { userId: user.id, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
