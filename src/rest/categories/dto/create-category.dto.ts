import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: 'Name must mot be longer than 50 characters' })
  name: string;
}
