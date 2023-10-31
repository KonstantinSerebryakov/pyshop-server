import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService, Prisma, User } from '@app/prisma-client-library';
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
        data: data,
      });

      const eventPayload: IEventDbPayload = {
        id: dbUser.id,
      };
      this.eventEmitter.emit(EventTypeDbAccounts.USER_CREATED, eventPayload);

      return new UserEntity(dbUser);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
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

  async updateOne(
    userId: string,
    data: UserEntity,
  ): Promise<UserEntity | null> {
    try {
      const dbUser = await this.prisma.user.update({
        where: { id: userId },
        data: data.getUpdate(),
      });
      return new UserEntity(dbUser);
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
    filter: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    try {
      const dbUser = await this.prisma.user.findUnique({
        where: filter,
      });
      return dbUser;
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

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const dbUser = await this.queryFindOneUnique({ email: email });
    return dbUser ? new UserEntity(dbUser) : null;
  }

  async findOneById(id: string): Promise<UserEntity | null> {
    const dbUser = await this.queryFindOneUnique({ id: id });
    return dbUser ? new UserEntity(dbUser) : null;
  }

  async deleteOneByEmail(email: string): Promise<boolean> {
    try {
      const dbUser = await this.prisma.user.delete({
        where: { email: email },
      });
      return !!dbUser;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2025':
            return true;
        }
      }
      throw e;
    }
  }
}
