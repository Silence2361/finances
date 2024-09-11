import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../../database/users/users.model';
import { Trim } from '../../../common/decorators/trim.decorator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  @Trim()
  password: string;

  @Field(() => String)
  @IsString()
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
