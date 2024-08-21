import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../../database/users/users.model';
import { Transform } from 'class-transformer';
import { Trim } from '../../../common/decorators/trim.decorator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  @Trim()
  password: string;

  @ApiProperty()
  @IsString()
  @IsEnum(UserRole)
  role: UserRole;
}
