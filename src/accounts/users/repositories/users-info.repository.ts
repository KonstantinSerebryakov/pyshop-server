import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PrismaService,
  PrismaClient,
  UserInfo,
} from '@app/prisma-client-library';
import { OnEvent } from '@nestjs/event-emitter';
import { EventTypeDbAccounts, IEventDbPayload } from '@app/events';
import { UserInfoEntity } from '../entities/user-info.entity';

@Injectable()
export class UsersInfoRepository {
  constructor(private readonly prisma: PrismaService) {}

  private async generateOne(userId: string) {
    const entity = new UserInfoEntity({
      userId: userId,
      name: null,
      phone: null,
      address: null,
      about: null,
    });

    return this.createOne(entity);
  }

  async createOne(data: UserInfoEntity) {
    try {
      const dbUserInfo = await this.prisma.userInfo.create({
        data: { ...data.getCreate() },
      });
      return new UserInfoEntity(dbUserInfo);
    } catch (e) {
      if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002': {
            throw new ConflictException(
              'There is a unique constraint violation, a new user cannot be created with this email',
            );
            // return null;
          }
        }
        throw e;
      }
    }
  }

  async upsertOneById(
    id: string,
    requestedUserId: string,
    data: UserInfoEntity,
  ) {
    try {
      const dbUserInfo = await this.prisma.userInfo.upsert({
        where: { id: id, userId: requestedUserId },
        update: { ...data.getUpdate() },
        create: { ...data.getCreate(), id: id },
      });
      return new UserInfoEntity(dbUserInfo);
    } catch (e) {
      if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002':
            throw new ConflictException({
              message:
                'The resource could not be updated or created.' +
                ' Given resource id is not valid or outdated.' +
                ' Please retrieve the latest version and try again.',
              details:
                'Possibly Race problem has been occured:' +
                'https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#unique-key-constraint-errors-on-upserts',
            });
        }
      }
      throw e;
    }
  }

  async updateOneById(
    id: string,
    requestedUserId: string,
    data: UserInfoEntity,
  ): Promise<UserInfoEntity | null> {
    try {
      const dbUserInfo = await this.prisma.userInfo.update({
        where: { id: id, userId: requestedUserId },
        data: { ...data.getUpdate() },
      });
      return new UserInfoEntity(dbUserInfo);
    } catch (e) {
      if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2016':
            throw new NotFoundException();
          // return null;
        }
      }
      throw e;
    }
  }

  private async queryFindOneUnique(
    filter: PrismaClient.UserInfoWhereUniqueInput,
    select: PrismaClient.UserInfoSelectScalar | null = null,
  ): Promise<UserInfo | null> {
    try {
      const dbUserInfo = await this.prisma.userInfo.findUnique({
        where: filter,
        select: select,
      });
      return dbUserInfo;
    } catch (e) {
      // for ErrorNotFoundInsteadNull:
      // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#rejectonnotfound
      if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2016':
            return null;
        }
      }
      throw e;
    }
  }

  async findOneByUserId(
    requestedUserId: string,
  ): Promise<UserInfoEntity | null> {
    const dbUserInfo = await this.queryFindOneUnique({
      userId: requestedUserId,
    });
    return dbUserInfo ? new UserInfoEntity(dbUserInfo) : null;
  }

  async findOneById(
    id: string,
    requestedUserId: string,
  ): Promise<UserInfoEntity | null> {
    const dbUserInfo = await this.queryFindOneUnique({
      id: id,
      userId: requestedUserId,
    });
    return dbUserInfo ? new UserInfoEntity(dbUserInfo) : null;
  }

  // async findOneByUserId(userId: string): Promise<UserInfoEntity | null> {
  //   const dbUserInfo = await this.queryFindOneUnique({ userId: userId });
  //   return dbUserInfo ? new UserInfoEntity(dbUserInfo) : null;
  // }

  async findOneUniqueFieldsById(id: string) {
    const dbUserInfo = await this.queryFindOneUnique(
      { id: id },
      { id: true, userId: true },
    );
    // Note: transformation required due to the prisma typing problem
    return dbUserInfo ? { id: dbUserInfo.id, userId: dbUserInfo.userId } : null;
  }

  async deleteOneById(
    id: string,
    requestedUserId: string,
  ): Promise<null | UserInfoEntity> {
    try {
      const dbUserInfo = await this.prisma.userInfo.delete({
        where: { id: id, userId: requestedUserId },
        select: { id: true }, // select nothing
      });
      return null;
    } catch (e) {
      if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
        console.log(e.code);
        switch (e.code) {
          case 'P2016':
            return null;
          // throw new NotFoundException();
        }
      }
      throw e;
    }
  }

  @OnEvent(EventTypeDbAccounts.USER_CREATED)
  private async handleUserCreatedEvent(payload: IEventDbPayload) {
    const userId = payload.id;
    this.generateOne(userId);
  }
}
