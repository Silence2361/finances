import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UsersPaginationQueryDto {
  @Field(() => Int, {
    nullable: true,
    description: 'The number of the page to return',
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  page: number;

  @Field(() => Int, {
    nullable: true,
    description: 'The number of items per page',
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  pageSize: number;
}
