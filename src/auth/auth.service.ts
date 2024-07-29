import { Injectable, UnauthorizedException} from '@nestjs/common';
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
    const { email, password} = dto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.query().insert({
      email,
      password: hashedPassword
    });
  }

  async findUser(email: string): Promise<User | undefined>{
    return this.userModel.query().findOne({email});
}


    async validateUser(email: string, password: string): Promise<{email: string}>{
        const user = await this.userModel.query().findOne(email);
        if(!user){
            throw new UnauthorizedException('User not found')
        }
        const isCorrectPassword = await bcrypt.compare( password, user.password)
        if(!isCorrectPassword){
            throw new UnauthorizedException('Wrong Password')
        }
        return {email: user.email};
    }


    async login(email: string): Promise <{access_token: string}>{
        const payload = {email};
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
