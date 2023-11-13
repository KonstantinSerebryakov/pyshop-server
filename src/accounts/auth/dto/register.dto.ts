import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @Length(5, 255)
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @Length(8, 128)
  password!: string;
}
