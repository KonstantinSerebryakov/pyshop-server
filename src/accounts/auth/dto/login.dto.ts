import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @Length(5, 255)
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Length(8, 64)
  password!: string;
}
