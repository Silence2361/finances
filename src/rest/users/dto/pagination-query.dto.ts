// import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PaginationQueryDto {
  @ApiProperty({ example: 1, description: 'The number of the page to return' })
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page: number;

  @ApiProperty({ example: 10, description: 'The number of items per page' })
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  pageSize: number;

  constructor() {
    console.log(
      'PaginationQueryDto created with page:',
      this.page,
      'and pageSize:',
      this.pageSize,
    );
  }
}

// export class PaginationQueryDto {
//   @ApiProperty({ example: 1, description: 'The number of the page to return' })
//   page: number;

//   @ApiProperty({ example: 10, description: 'The number of items per page' })
//   pageSize: number;
// }
