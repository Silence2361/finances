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
  category_id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  type: string;
}
