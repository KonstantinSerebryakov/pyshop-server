import { IUser, IUserInfo, IUserInfoUpdate } from '@app/interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto implements IUser {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  email?: string;
}
