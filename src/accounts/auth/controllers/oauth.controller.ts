import { Controller, Get, Query, Request, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Request as RequestExp, Response as ResponseExp } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { JwtRefreshableService } from '@app/shared-jwt/services/jwt-refreshable.service';
import { GoogleService } from '../services/google.service';

@ApiTags('Auth')
@Controller('auth/google')
export class OAuthController {
  constructor(
    private readonly googleService: GoogleService,
    private readonly authService: AuthService,
    private readonly jwtServiceShared: JwtRefreshableService,
  ) {}

  @Get('callback')
  async google(
    @Query('code') code: string,
    @Query('scope') scope: string,
    @Query('error') error: string,
    @Query('state') state: string,
    @Request() req: RequestExp,
    @Res({ passthrough: true }) res: ResponseExp,
  ) {
    const url = new URL(
      'https://pyshop-konstantin-serebryakov-8ebd937f65cc.herokuapp.com/',
    );
    // const url = new URL('http://localhost:9000/');
    if (error) {
      // TODO: navigate to error page?
      url.pathname += '';
    }

    const result = await this.googleService.handleGoogleOauthCallback(
      code,
      state,
    );

    url.pathname += '#/oauth/success';
    url.searchParams.append('refresh_token', result.refresh_token.token);
    url.searchParams.append('exp', result.refresh_token.exp.toString());
    url.searchParams.append('userid', (result.user.id ?? '').toString());
    res.status(301);
    res.setHeader('Location', url.toString().replace('%23', '#'));
    // Set the JWT token as cookie
    // res.status(301).setHeader('Location', url.href).cookie('refreshToken', refreshToken).end();
  }
}
