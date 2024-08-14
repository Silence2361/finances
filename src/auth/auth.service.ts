import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../users/interfaces/user.interface';
import { UsersRepository } from '../repositories/user.repository';
import { UserRole } from '../users/users.model';
import { AuthResponse } from './interfaces/auth-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async register(dto: AuthDto): Promise<IUser> {
    const existingUser = await this.usersRepository.findUserByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    dto.password = hashedPassword;

    const user: IUser = await this.usersRepository.createUser({
      email: dto.email,
      password: dto.password,
      role: UserRole.USER,
    });
    delete user.password;
    return user;
  }

  async login(dto: AuthDto): Promise<AuthResponse> {
    const user = await this.usersRepository.findUserByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isCorrectPassword = await bcrypt.compare(dto.password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong Password');
    }

    const payload = { userId: user.id, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
