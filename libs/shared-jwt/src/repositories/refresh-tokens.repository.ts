import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RefreshTokensRepository {
  static REFRESH_TOKENS_LIMIT = 5;
  private readonly redis: Redis;

  constructor() {
    const port = process.env.REDIS_PORT;
    this.redis = new Redis({
      port: port ? Number.parseInt(port) : undefined,
      host: process.env.REDIS_HOST,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      reconnectOnError: (e: Error): boolean | 1 | 2 => {
        Logger.error(e.message);
        return 2;
      },
    });
    this.redis.on('error', (e: Error) => {
      Logger.log('ioredis: ' + e.message + ' - ' + e.name);
    });
  }

  private async generateRefreshKeyString(userId: string, deviceId: string) {
    return `refresh:${userId}:${deviceId}`;
  }
  private async generateDeviceListKeyString(userId: string) {
    return `devices:${userId}`;
  }

  async updateRefreshToken(
    userId: string,
    deviceId: string,
    targetToken: string,
    newToken: string,
  ) {
    const key = await this.generateRefreshKeyString(userId, deviceId);
    return this.redis.get(key).then((res) => {
      if (!res)
        throw new UnauthorizedException(
          'Refresh token is not valid. navigate to signin.',
        );
      const storedToken = res.toString();
      if (storedToken !== targetToken)
        throw new UnauthorizedException(
          'Refresh token is not valid. navigate to signin.',
        );
      process.nextTick(() => {
        this.redis.set(key, newToken);
      });
    });
  }

  async addRefreshToken(userId: string, deviceId: string, token: string) {
    const iat = Math.floor(Date.now() / 1000);
    const key = await this.generateRefreshKeyString(userId, deviceId);
    const listKey = await this.generateDeviceListKeyString(userId);
    this.redis
      .multi()
      .set(key, token)
      .zadd(listKey, iat, key)
      .zcard(listKey)
      .exec((err, results) => {
        if (!results) throw UnauthorizedException;
        const count = results[2][1] as number | undefined | null;
        if (count && count > RefreshTokensRepository.REFRESH_TOKENS_LIMIT) {
          this.popExcessRefreshTokens(
            listKey,
            Math.max(0, count - RefreshTokensRepository.REFRESH_TOKENS_LIMIT),
          );
        }
      });
  }

  private async popExcessRefreshTokens(key: string, limit: number) {
    this.redis.zpopmin(key, limit);
  }
}
