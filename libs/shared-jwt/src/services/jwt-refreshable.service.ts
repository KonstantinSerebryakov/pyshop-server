import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokensRepository } from '../repositories/refresh-tokens.repository';
import { v4 as uuidv4 } from 'uuid';
import {
  IJWTPayloadAccess,
  IJWTPayloadBase,
  IJWTPayloadRefresh,
} from '@app/interfaces/interfaces/jwt-payload.interface';

@Injectable()
export class JwtRefreshableService {
  constructor(
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly jwtService: JwtService,
  ) {}

  private async generateAccessToken(payload: IJWTPayloadAccess) {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_EXP_ACCESS,
    });
    return token;
  }

  private async generateRefreshToken(payload: Omit<IJWTPayloadRefresh, 'id'>) {
    const token = await this.jwtService.signAsync(
      { ...payload, id: uuidv4() },
      {
        expiresIn: process.env.JWT_EXP_REFRESH,
      },
    );
    return token;
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

  async revokeTokens(refreshToken: string) {
    const extractedPayload =
      await this.extractRefreshTokenPayload(refreshToken);
    const payloadRefresh: IJWTPayloadRefresh = {
      id: extractedPayload.id,
      deviceId: extractedPayload.deviceId,
      userId: extractedPayload.userId,
    };
    const payloadAccess: IJWTPayloadAccess = { id: extractedPayload.userId };

    const now = Math.floor(Date.now() / 1000);
    const expiresIn = extractedPayload.exp - now;

    const updatedRefreshToken = this.jwtService.sign(payloadRefresh, {
      expiresIn,
    });
    await this.refreshTokensRepository.updateRefreshToken(
      extractedPayload.userId,
      extractedPayload.deviceId,
      refreshToken,
      updatedRefreshToken,
    );

    const accessToken = await this.generateAccessToken(payloadAccess);
    return { access_token: accessToken, refresh_token: updatedRefreshToken };
  }

  async generateTokens(userId: string, deviceId: string) {
    const refreshToken = await this.generateRefreshToken({
      userId: userId,
      deviceId: deviceId,
    });
    this.refreshTokensRepository.addRefreshToken(
      userId,
      deviceId,
      refreshToken,
    );

    // console.log(await this.refreshTokensRepository.print(userId, deviceId));

    const accessToken = await this.generateAccessToken({ id: userId });
    return { accessToken, refreshToken };
  }
}
