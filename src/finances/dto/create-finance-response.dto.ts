import { ApiProperty } from '@nestjs/swagger';

export class CreateFinanceResponseDto {
  @ApiProperty()
  id: number;
}
