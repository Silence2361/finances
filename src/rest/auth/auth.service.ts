import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../../database/users-database/interfaces/user.interface';
import { UsersRepository } from '../../database/repositories/user.repository';
import { UserRole } from '../../database/users-database/users.model';
import {
  ILoginCredentials,
  ILoginResponse,
  IRegisterCredentials,
  IRegisterResponse,
} from '../../database/auth-database/interfaces/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async register(
    credentials: IRegisterCredentials,
  ): Promise<IRegisterResponse> {
    const existingUser = await this.usersRepository.findUserByEmail(
      credentials.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    credentials.password = hashedPassword;

    const user: IUser = await this.usersRepository.createUser({
      email: credentials.email,
      password: credentials.password,
      role: UserRole.USER,
    });
    return { email: user.email, role: user.role, id: user.id };
  }

  async login(credentials: ILoginCredentials): Promise<ILoginResponse> {
    const user = await this.usersRepository.findUserByEmail(credentials.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isCorrectPassword = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong Password');
    }

    const payload = { userId: user.id, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
