import { BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from 'nestjs-objection';
import { User } from '../users/users.model';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { ModelClass } from 'objection';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {

    constructor(@InjectModel(User) private readonly userModel: ModelClass<User>,/*@InjectModel(User) private readonly userModel: ModelClass<User>*/
                private readonly jwtService: JwtService){}


   async register(dto: AuthDto): Promise<User> {
    const { email, password } = dto;
    console.log('Registering user:', email);
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.userModel.query().insert({
        email,
        password: hashedPassword,
        role: 'User',
      });
      console.log('User registered:', user);
      return user;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new BadRequestException('Failed to register user');
    }
  }

  async findUser(email: string): Promise<User | undefined> {
    if (!email) {
      throw new UnauthorizedException('Email must be provided');
    }
    console.log('Finding user with email:', email);
    try {
      const result = await this.userModel.query().where({ email }).first(); // поиск первой записи в списке пользователей, где соответствуется к указанному значению 
      console.log('Find user result:', result);
      return result;
    } catch (error) {
      console.error('Error in findUser:', error);
      throw error;
    }
  }


  async validateUser(email: string, password: string): Promise<{ email: string, role: string }> {
    if (!email || !password) {
      throw new UnauthorizedException('Email and password must be provided');
    }
    console.log('Validating user:', email);
    const user = await this.findUser(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong Password');
    }

    return { email: user.email, role: user.role };
  }


    async login(dto: AuthDto): Promise<{ access_token: string }> {
        const { email, password } = dto;
        console.log('Logging in user:', email, 'with password:', password);
        const user = await this.validateUser(email, password);
        const payload = { email: user.email, role: user.role };
        console.log('Generating JWT token for user:', email);
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }
}
