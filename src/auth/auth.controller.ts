import { BadRequestException, Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(@Inject()private readonly authService: AuthService){}

    //@UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() dto: AuthDto){
        const oldUser = await this.authService.findUser(dto.email);
        if(oldUser){
            throw new BadRequestException('Already registered')
        }
        return this.authService.register(dto)
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: AuthDto){
        const user = await this.authService.validateUser(dto.email, dto.password);
        return this.authService.login(user.email)
    }
}
