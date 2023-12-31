import { IUserPublic } from '@app/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Length } from 'class-validator';
import { TokenResponsePayload } from './tokens-refresh-response.dto';

export class UserPublicDto implements IUserPublic {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  email?: string;
}

export class LoginResponseDto {
  @ApiProperty({ type: UserPublicDto })
  user!: UserPublicDto;
  @ApiProperty({ type: TokenResponsePayload })
  access_token!: TokenResponsePayload;
  @ApiProperty({ type: TokenResponsePayload })
  refresh_token!: TokenResponsePayload;
}
