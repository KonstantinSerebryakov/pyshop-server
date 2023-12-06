import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/accounts/users/entities/user.entity';
import { UsersRepository } from 'src/accounts/users/repositories/users.repository';
import { JwtRefreshableService } from '@app/shared-jwt/services/jwt-refreshable.service';
import axios, { AxiosError, HttpStatusCode } from 'axios';

@Injectable()
export class GoogleService {
  axios = axios.create();
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
    private readonly jwtServiceShared: JwtRefreshableService,
  ) {}

  private getAccessToken(code: string) {
    const url = new URL('https://oauth2.googleapis.com/token');
    url.searchParams.append(
      'redirect_uri',
      'https://pyshop-konstantin-serebryakov-8ebd937f65cc.herokuapp.com/api/auth/google/callback',
    );
    url.searchParams.append('client_id', process.env.GOOGLE_CLIENT_ID ?? '');
    url.searchParams.append('code', code);
    url.searchParams.append(
      'client_secret',
      process.env.GOOGLE_CLIENT_SECRET ?? '',
    );
    url.searchParams.append('grant_type', 'authorization_code');

    return this.axios
      .post(url.href, undefined, {})
      .then((response) => {
        const status = response.status;
        const data = response.data as
          | {
              access_token: string;
              expires_in: number;
              scope: string;
              token_type: string;
              id_token: string;
            }
          | undefined;
        if (status === HttpStatusCode.Ok && data) {
          return data;
        }
        return undefined;
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          console.log(e.response?.data);
        }
        return undefined;
      });
  }

  async handleGoogleOauthCallback(code: string, state: string) {
    const tokens = await this.getAccessToken(code);
    if (!tokens) throw new UnauthorizedException();
    const googleAccessToken = tokens?.access_token ?? '';
    const idToken = tokens?.id_token ?? '';
    console.log();

    const decodedToken = this.jwtService.decode(idToken, {
      complete: false,
    }) as {
      iss: string;
      azp: string;
      aud: string;
      sub: string;
      email: string;
      email_verified: boolean;
      at_hash: string;
      iat: number;
      exp: number;
    };
    const email = decodedToken.email;

    let storedUser = await this.usersRepository.findOneByEmail(email);
    if (!storedUser) {
      const userEntity = new UserEntity({
        email: decodedToken.email,
        passwordHash: null,
        type: 'google',
      });
      storedUser = await this.usersRepository.createOne(userEntity);
    }

    const { accessToken, refreshToken } =
      await this.jwtServiceShared.generateTokens(storedUser.id ?? '', state);

    return {
      user: await storedUser.getPublic(),
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
