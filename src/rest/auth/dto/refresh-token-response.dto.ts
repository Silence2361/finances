import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenCommandResponseDto {
  @ApiProperty({ example: 'jwt_token', description: 'JWT Access Token' })
  accessToken: string;
}
