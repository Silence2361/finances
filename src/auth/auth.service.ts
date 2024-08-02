import { BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { User } from '../users/users.model';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { ModelClass } from 'objection';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../users/users.service';
import { IUser } from '../users/interfaces/user.interface';


@Injectable()
export class AuthService {

    constructor(@InjectModel(User) private readonly userModel: ModelClass<User>,/*@InjectModel(User) private readonly userModel: ModelClass<User>*/
                private readonly jwtService: JwtService,
                private readonly usersService: UserService){}


   async register(dto: AuthDto): Promise<IUser> {
      const user = await this.usersService.createUser({
        email: dto.email,
        password: dto.password,
        role: 'User',
      });
      console.log(`User registered: ${user.email}, ID: ${user.id}`);
       return user as IUser;
  }


  async validateUser(email: string, password: string): Promise<Omit<IUser, 'password'>> {
    if (!email || !password) {
      throw new UnauthorizedException('Email and password must be provided');
    }
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong Password');
    }

    return { id: user.id, email: user.email, role: user.role };
  }


    async login(dto: AuthDto): Promise<{ access_token: string }> {
        const { email, password } = dto;
        const user = await this.validateUser(email, password);
        const payload = { email: user.email, role: user.role };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }
}
