import { ApiProperty } from '@nestjs/swagger';

export class GenerateTokenResponseDto {
  @ApiProperty({ example: 'jwt_token', description: 'JWT Access Token' })
  accessToken: string;

  @ApiProperty({ example: 'jwt_token', description: 'JWT Refresh Token' })
  refreshToken: string;
}
