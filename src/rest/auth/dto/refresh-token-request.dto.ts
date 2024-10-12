import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenRequestDto {
  @ApiProperty({ example: 'jwt_token', description: 'JWT Refresh Token' })
  refreshToken: string;
}
