import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { Response } from 'express';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterResponseDto } from '../dto/register-response.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { AuthToken, JWTAuthGuard } from '@app/shared-jwt';
import { JwtRefreshableService } from '@app/shared-jwt/services/jwt-refreshable.service';
import { TokensRefreshResponseDto } from '../dto/tokens-refresh-response.dto';
import { LogoutDto } from '../dto/logout.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtServiceShared: JwtRefreshableService,
  ) {}

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

  @ApiUnauthorizedResponse({
    description: 'Refresh token is not valid. navigate to signin.',
  })
  @ApiCreatedResponse({
    type: TokensRefreshResponseDto,
  })
  @Post('refresh')
  @UseGuards(JWTAuthGuard)
  async refresh(@AuthToken() token: string) {
    const payload = this.jwtServiceShared.refreshTokens(token);

    return payload;
  }

  @ApiOkResponse({})
  @Post('logout')
  async logout(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LogoutDto,
  ) {
    await this.jwtServiceShared.unvalidateRefreshToken(dto.token);
    res.status(200);
  }
}
