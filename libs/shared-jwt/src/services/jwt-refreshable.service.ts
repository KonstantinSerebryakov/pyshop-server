import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokensRepository } from '../repositories/refresh-tokens.repository';
import { v4 as uuidv4 } from 'uuid';
import {
  IJWTPayloadAccess,
  IJWTPayloadBase,
  IJWTPayloadRefresh,
} from '@app/interfaces/interfaces/jwt-payload.interface';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ms = require('ms');

@Injectable()
export class JwtRefreshableService {
  constructor(
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async generateAccessToken(payload: IJWTPayloadAccess) {
    const expiresIn = process.env.JWT_EXP_ACCESS ?? '100';
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: expiresIn,
    });
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    console.log(Math.floor(ms(expiresIn)));
    return { exp: Math.floor(ms(expiresIn) / 1000), token: token };
  }

  private async generateRefreshToken(payload: Omit<IJWTPayloadRefresh, 'id'>) {
    const expiresIn = process.env.JWT_EXP_REFRESH ?? '100';
    const token = await this.jwtService.signAsync(
      { ...payload, id: uuidv4() },
      {
        expiresIn: expiresIn,
      },
    );
    console.log(expiresIn);
    console.log(ms(expiresIn));
    return { exp: Math.floor(ms(expiresIn) / 1000), token: token };
  }

  private async extractTokenPayload<T extends IJWTPayloadBase>(
    token: string,
  ): Promise<T> {
    const decodedToken = this.jwtService.decode(token, {
      complete: false,
    });
    return decodedToken as T;
  }

  private async extractRefreshTokenPayload(refreshToken: string) {
    return this.extractTokenPayload<IJWTPayloadRefresh & IJWTPayloadBase>(
      refreshToken,
    );
  }

  private async extractAccessTokenPayload(accessToken: string) {
    return this.extractTokenPayload<IJWTPayloadAccess & IJWTPayloadBase>(
      accessToken,
    );
  }

  async refreshTokens(refreshToken: string) {
    const extractedPayload =
      await this.extractRefreshTokenPayload(refreshToken);
    const payloadRefresh: IJWTPayloadRefresh = {
      id: extractedPayload.id,
      deviceId: extractedPayload.deviceId,
      userId: extractedPayload.userId,
    };
    const payloadAccess: IJWTPayloadAccess = { id: extractedPayload.userId };

    const now = Math.floor(Date.now() / 1000);
    const updatedTokenExpiresIn = extractedPayload.exp - now;
    const updatedRefreshToken = this.jwtService.sign(payloadRefresh, {
      expiresIn: updatedTokenExpiresIn,
    });
    await this.refreshTokensRepository.updateRefreshToken(
      extractedPayload.userId,
      extractedPayload.deviceId,
      refreshToken,
      updatedRefreshToken,
    );

    const accessToken = await this.generateAccessToken(payloadAccess);
    return {
      access_token: accessToken,
      refresh_token: {
        exp: updatedTokenExpiresIn,
        token: updatedRefreshToken,
      },
    };
  }

  async generateTokens(userId: string, deviceId: string) {
    const refreshToken = await this.generateRefreshToken({
      userId: userId,
      deviceId: deviceId,
    });
    this.refreshTokensRepository.addRefreshToken(
      userId,
      deviceId,
      refreshToken.token,
    );

    // console.log(await this.refreshTokensRepository.print(userId, deviceId));

    const accessToken = await this.generateAccessToken({ id: userId });
    return { accessToken, refreshToken };
  }
}
