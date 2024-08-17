import { ApiProperty } from '@nestjs/swagger';

export class UpdateFinanceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  date: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  type: string;
}
