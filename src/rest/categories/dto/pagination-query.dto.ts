import { IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CategoryPaginationQueryDto {
  @ApiProperty({ example: 1, description: 'The number of the page to return' })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  page: number;

  @ApiProperty({ example: 10, description: 'The number of items per page' })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  pageSize: number;
}
