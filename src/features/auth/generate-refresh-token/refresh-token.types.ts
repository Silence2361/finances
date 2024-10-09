export interface GenerateTokenCommand {
  userId: number;
  roleId: number;
  sessionId: number;
}

export interface GenerateTokenCommandResult {
  accessToken: string;
  refreshToken: string;
}
