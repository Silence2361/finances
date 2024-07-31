import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../payload/jwt.payload';
import { UserService } from '../../users/users.service';
import { IUser } from '../../users/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<IUser> {
    console.log('Payload:', payload);
    const user = await this.userService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: user.id, email: user.email, password: user.password, role: user.role };
  }
}