import { IUserPublic } from '@app/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class UserPublicDto implements IUserPublic {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  email?: string;
}

export class RegisterResponseDto {
  @ApiProperty({ type: UserPublicDto })
  user?: UserPublicDto;
}
