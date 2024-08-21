import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '../../database/users/user.repository';
import { UserRole } from '../../database/users/users.model';
import {
  ILoginCredentials,
  ILoginResponse,
  IRegisterCredentials,
  IRegisterResponse,
} from '../../database/auth/auth-response.interface';
import { IUser } from '../../database/users/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async register(
    credentials: IRegisterCredentials,
  ): Promise<IRegisterResponse> {
    const { email, password } = credentials;
    const existingUser = await this.usersRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await this.usersRepository.createUser({
      email,
      password: hashedPassword,
      role: UserRole.USER,
    });
    const { id, role } = user;
    return { email, role, id };
  }

  async login(credentials: ILoginCredentials): Promise<ILoginResponse> {
    const { email, password } = credentials;
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
