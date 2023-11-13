import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RefreshTokensRepository {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis({
      port: 19499,
      host: 'redis-19499.c1.eu-west-1-3.ec2.cloud.redislabs.com',
      username: 'client',
      password: 'xste-7nusCP-Br8QGvLw4ZkUPS!wt9dv7kw-82Q418Dvi5k!',
    });
  }

  private async generateKeyString(userId: string) {
    return `refresh_tokens_${userId.replace('-', '_')}`;
  }

  async getRefreshTokens(userId: string) {
    const key = await this.generateKeyString(userId);
    const listLength = await this.redis.llen(key);
    const pairs = await this.redis.lrange(key, 0, listLength - 1);
    return pairs;
  }

  async addRefreshToken(userId: string, token: string) {
    const key = await this.generateKeyString(userId);
    this.redis.rpush(key, token);
  }

  async removeRefreshToken(userId: string, token: string) {
    const key = await this.generateKeyString(userId);
    this.redis.lrem(key, 1, token);
  }
}
