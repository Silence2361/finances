import { BadRequestException, Body, Controller, HttpCode, Inject, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(@Inject()private readonly authService: AuthService,
                         private readonly usersService: UserService){}

    
    @Post('register')
    @ApiOperation({ summary: 'Registration of new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async register(@Body(ValidationPipe) dto: AuthDto) {
        console.log('Register DTO:', { email: dto.email });
        const oldUser = await this.usersService.findByEmail(dto.email).catch(() => null);
        if (oldUser) {
            console.error('User already registered:', oldUser);
            throw new BadRequestException('Already registered');
    }
        try {
            const newUser = await this.authService.register(dto);
            console.log('New user registered:', newUser);
            return newUser;
          } catch (error) {
            console.error('Error registering user:', error);
            throw new BadRequestException('Failed to register user');
    }
  }

    //@HttpCode(200)
    @Post('login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 200, description: 'Successfully logged in.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async login(@Body(ValidationPipe) dto: AuthDto){
        return this.authService.login(dto)
    }
}
