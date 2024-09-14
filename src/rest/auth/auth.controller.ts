import { AuthDto } from './dto/auth.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { RegisterUserFeature } from '../../features/auth/register-user/register-user.feature';
import { LoginUserFeature } from '../../features/auth/login-user/login-user.feature';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginDto } from './dto/login.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly registerUserFeature: RegisterUserFeature,
    private readonly loginUserFeature: LoginUserFeature,
  ) {}

  @Mutation(() => RegisterResponseDto)
  async register(
    @Args('authData') authData: AuthDto,
  ): Promise<RegisterResponseDto> {
    return this.registerUserFeature.execute(authData);
  }

  @Mutation(() => LoginResponseDto)
  async login(@Args('authData') authData: LoginDto): Promise<LoginResponseDto> {
    return this.loginUserFeature.execute(authData);
  }
}
