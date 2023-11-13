import { IUserInfo, IUserInfoUpdate } from '@app/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Length } from 'class-validator';
import { Nullable } from 'class-validator-extended';

export class UserInfoResponseDto implements IUserInfo {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  userId?: string;
  @ApiProperty()
  name?: string | null;
  @ApiProperty()
  phone?: string | null;
  @ApiProperty()
  address?: string | null;
  @ApiProperty()
  about?: string | null;
}
