import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GenerateTokenDto {
  @ApiProperty({
    description: 'ID пользователя',
    example: 123,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'ID роли',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({
    description: 'Session ID',
    example: 456789,
  })
  @IsNumber()
  @IsNotEmpty()
  sessionId: number;
}
