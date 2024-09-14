import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { Trim } from '../../../common/decorators/trim.decorator';
import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '../enums/user-role.enum';

@InputType()
export class AuthDto {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @Trim()
  password: string;

  @Field(() => String)
  @IsEnum(UserRole)
  role: UserRole;
}
