import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MaxLength } from 'class-validator';

export class LogoutDto {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @MaxLength(1024)
  token!: string;
}
