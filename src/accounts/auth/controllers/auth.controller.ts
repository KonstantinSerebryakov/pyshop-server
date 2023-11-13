import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { Response } from 'express';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiHeaders,
  ApiNotFoundResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterResponseDto } from '../dto/register-response.dto';
import { LoginResponseDto } from '../dto/login-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiQuery({ type: RegisterDto })
  @ApiConflictResponse({
    description: 'Email already in use. Please use a different email address.',
  })
  @ApiCreatedResponse({
    type: RegisterResponseDto,
    headers: { Location: { description: 'users/:userId' } },
  })
  @Post('signup')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterDto,
  ) {
    const payload = await this.authService.register(dto);

    res.setHeader('Location', `users/${payload.user.id}`);

    return payload;
  }

  @ApiQuery({ type: LoginDto })
  // @ApiNotFoundResponse({ // !replace with unauthorized exception
  //   description:
  //     'The provided email does not exist in our system. Please double-check your email or sign up to create an account.',
  // })
  @ApiUnauthorizedResponse({
    description: 'Authorization failed. The password or email are incorrect.',
  })
  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  @Post('signin')
  async login(@Body() dto: LoginDto) {
    const payload = this.authService.login(dto);

    return payload;
  }
}
