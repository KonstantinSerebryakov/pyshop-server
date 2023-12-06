import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService, PrismaClient, User } from '@app/prisma-client-library';
import { UserEntity } from '../entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventTypeDbAccounts, IEventDbPayload } from '@app/events';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async createOne(data: UserEntity): Promise<UserEntity> {
    try {
      const dbUser = await this.prisma.user.create({
        data: { ...data.getCreate() },
      });

      const eventPayload: IEventDbPayload = {
        id: dbUser.id,
      };
      this.eventEmitter.emit(EventTypeDbAccounts.USER_CREATED, eventPayload);

      return new UserEntity(dbUser);
    } catch (e) {
      if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002':
            throw new ConflictException(
              'Email already in use. Please use a different email address.',
            );
        }
      }
      throw e;
    }
  }

  async updateOneById(
    id: string,
    data: UserEntity,
  ): Promise<UserEntity | null> {
    try {
      const dbUser = await this.prisma.user.update({
        where: { id: id },
        data: { ...data.getUpdate() },
      });
      return new UserEntity(dbUser);
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
    filter: PrismaClient.UserWhereUniqueInput,
    select: PrismaClient.UserSelectScalar | null = null,
  ): Promise<User | null> {
    try {
      const dbUser = await this.prisma.user.findUnique({
        where: filter,
        select: select,
      });
      return dbUser;
    } catch (e) {
      if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2016':
            return null;
          // throw new NotFoundException();
        }
      }
      throw e;
    }
  }

  async findOneUniqueFieldsByEmail(email: string) {
    const dbUser = await this.queryFindOneUnique(
      { email: email },
      { id: true, email: true },
    );
    // Note: transformation required due to the prisma typing problem
    return dbUser ? { id: dbUser.id, email: dbUser.email } : null;
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const dbUser = await this.queryFindOneUnique({
      email: email.toLowerCase(),
    });
    return dbUser ? new UserEntity(dbUser) : null;
  }

  async findOneById(id: string): Promise<UserEntity | null> {
    const dbUser = await this.queryFindOneUnique({ id: id });
    return dbUser ? new UserEntity(dbUser) : null;
  }

  async deleteOneByEmail(email: string): Promise<UserEntity | null> {
    try {
      const dbUser = await this.prisma.user.delete({
        where: { email: email },
        select: {}, // select nothing
      });
      return null;
      // return new UserEntity(dbUser);
    } catch (e) {
      if (e instanceof PrismaClient.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2016':
            return null;
        }
      }
      throw e;
    }
  }
}
