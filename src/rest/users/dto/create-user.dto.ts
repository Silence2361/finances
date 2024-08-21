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
import { Trim } from '../../../common/decorators/trim.decorator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(25)
  @Trim()
  password: string;

  @ApiProperty({ example: UserRole.USER, description: 'The role of the user' })
  @IsString()
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
