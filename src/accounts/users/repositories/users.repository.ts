import { Injectable } from '@nestjs/common';
import { PrismaService, Prisma, User } from '@app/prisma-client-library';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}
}
