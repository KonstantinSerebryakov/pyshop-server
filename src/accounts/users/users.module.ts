import { Module } from '@nestjs/common';
import { UsersInfoController } from './controllers/users-info.controller';
import { UsersInfoRepository } from './repositories/users-info.repository';
import { UsersRepository } from './repositories/users.repository';
import { PrismaClientLibraryModule } from '@app/prisma-client-library';

@Module({
  imports: [PrismaClientLibraryModule],
  controllers: [UsersInfoController],
  exports: [UsersRepository],
  providers: [UsersInfoRepository, UsersRepository],
})
export class UsersModule {}
