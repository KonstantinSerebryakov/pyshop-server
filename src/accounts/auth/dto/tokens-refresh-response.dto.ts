import { ApiProperty } from '@nestjs/swagger';

export class TokenResponsePayload {
  @ApiProperty()
  exp!: string;
  @ApiProperty()
  token!: string;
}

export class TokensRefreshResponseDto {
  @ApiProperty({ type: TokenResponsePayload })
  access_token!: TokenResponsePayload;
  @ApiProperty({ type: TokenResponsePayload })
  refresh_token!: TokenResponsePayload;
}
