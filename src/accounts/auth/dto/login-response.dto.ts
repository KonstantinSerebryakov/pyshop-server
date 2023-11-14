import { IUserPublic } from '@app/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class UserPublicDto implements IUserPublic {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  email?: string;
}

export class LoginResponseDto {
  @ApiProperty({ type: UserPublicDto })
  user!: UserPublicDto;
  @ApiProperty()
  access_token!: string;
  @ApiProperty()
  refresh_token!: string;
}
