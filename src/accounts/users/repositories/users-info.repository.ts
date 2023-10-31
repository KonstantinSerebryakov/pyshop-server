import { Injectable } from '@nestjs/common';
import {
  PrismaService,
  Prisma,
  User,
  UserInfo,
} from '@app/prisma-client-library';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EventTypeDbAccounts, IEventDbPayload } from '@app/events';
import { UserInfoEntity } from '../entities/user-info.entity';

@Injectable()
export class UsersInfoRepository {
  constructor(private readonly prisma: PrismaService) {}

  private async generateOne(userId: string) {
    const createInput: Prisma.UserInfoUncheckedCreateInput = {
      userId: userId,
      name: null,
      phone: null,
      address: null,
      about: null,
    };

    const dbUserInfo = await this.prisma.userInfo.create({
      data: createInput,
    });

    return new UserInfoEntity(dbUserInfo);
  }

  async updateOne(
    userId: string,
    data: UserInfoEntity,
  ): Promise<UserInfoEntity | null> {
    try {
      const dbUserInfo = await this.prisma.userInfo.update({
        where: { userId: userId },
        data: data.getUpdate(),
      });
      return new UserInfoEntity(dbUserInfo);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2016':
            return null;
          // throw new NotFoundException();
        }
      }
      throw e;
    }
  }

  private async queryFindOneUnique(
    filter: Prisma.UserInfoWhereUniqueInput,
  ): Promise<UserInfo | null> {
    try {
      const dbUserInfo = await this.prisma.userInfo.findUnique({
        where: filter,
      });
      return dbUserInfo;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2016':
            return null;
          // throw new NotFoundException();
        }
      }
      throw e;
    }
  }

  async findOneById(id: string): Promise<UserInfoEntity | null> {
    const dbUserInfo = await this.queryFindOneUnique({ id: id });
    return dbUserInfo ? new UserInfoEntity(dbUserInfo) : null;
  }

  async findOneByUserId(userId: string): Promise<UserInfoEntity | null> {
    const dbUserInfo = await this.queryFindOneUnique({ userId: userId });
    return dbUserInfo ? new UserInfoEntity(dbUserInfo) : null;
  }

  @OnEvent(EventTypeDbAccounts.USER_CREATED)
  private async handleUserCreatedEvent(payload: IEventDbPayload) {
    const userId = payload.id;
    this.generateOne(userId);
  }
}
