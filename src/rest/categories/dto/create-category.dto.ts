import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Food', description: 'The name of the category' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Name must mot be longer than 50 characters' })
  name: string;
}
