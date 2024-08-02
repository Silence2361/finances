import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({example: 'user@example.com', description: 'The email of the user'})
  @IsEmail()
  email!: string;

  @ApiProperty({example: 'password123', description: 'The password of the user'})
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  password!: string;
}
