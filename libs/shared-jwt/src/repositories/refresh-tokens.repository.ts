import { PrismaService } from '@app/prisma-client-library';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RefreshTokensRepository {
  constructor(private readonly prisma: PrismaService) {}
  static REFRESH_TOKENS_LIMIT = 5;

  async updateRefreshToken(
    userId: string,
    deviceId: string,
    targetToken: string,
    newToken: string,
  ) {
    return (
      this.prisma.refreshTokens
        .update({
          where: {
            deviceId_userId: {
              userId: userId,
              deviceId: deviceId,
            },
            token: targetToken,
          },
          data: {
            token: newToken,
          },
          select: {
            id: true,
            token: true,
          },
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((e: unknown) => {
          throw new UnauthorizedException(
            'Refresh token is not valid. navigate to signin.',
          );
        })
    );
  }

  async addRefreshToken(userId: string, deviceId: string, token: string) {
    return (
      this.prisma
        .$transaction([
          this.prisma.refreshTokens.upsert({
            where: {
              deviceId_userId: {
                userId: userId,
                deviceId: deviceId,
              },
            },
            update: {
              token: token,
            },
            create: {
              userId: userId,
              deviceId: deviceId,
              token: token,
            },
          }),
          this.prisma.refreshTokens.findMany({
            where: {
              userId: userId,
            },
            select: {
              id: true,
              updatedAt: true,
            },
            orderBy: {
              updatedAt: 'asc',
            },
          }),
        ])
        .then((results) => {
          // const created = results[0];
          const storedKeys = results[1];
          const ids = storedKeys.map((key) => key.id);
          this.popExcessRefreshTokens(userId, ids);
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((e: unknown) => {
          throw UnauthorizedException;
        })
    );
  }

  private async popExcessRefreshTokens(userId: string, ids: string[]) {
    const count = ids.length;
    if (count <= RefreshTokensRepository.REFRESH_TOKENS_LIMIT) return;
    const idsToDelete = ids.slice(
      0,
      -RefreshTokensRepository.REFRESH_TOKENS_LIMIT,
    );
    try {
      await this.prisma.refreshTokens.deleteMany({
        where: {
          id: {
            in: idsToDelete,
          },
        },
      });
    } catch (e: unknown) {
      //
    }
  }

  public async removeRefreshToken(token: string) {
    return this.prisma.refreshTokens
      .deleteMany({
        where: { token: token },
      })
      .catch((e: unknown) => {
        //
      });
  }
}
