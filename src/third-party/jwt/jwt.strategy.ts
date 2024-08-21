import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './payload/jwt.payload';
import { UsersRepository } from '../../database/users/user.repository';
import { IUser } from '../../database/users/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<Omit<IUser, 'password'>> {
    const user = await this.usersRepository.findUserById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: user.id, email: user.email, role: user.role };
  }
}
