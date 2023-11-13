import { IUserInfoUpdate } from '@app/interfaces';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';

export class UpdateUserInfoDto implements IUserInfoUpdate {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 255)
  name?: string | null;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 20)
  phone?: string | null;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 255)
  address?: string | null;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 2600)
  about?: string | null;
}
