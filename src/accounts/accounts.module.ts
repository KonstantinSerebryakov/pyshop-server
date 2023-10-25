import { Module } from '@nestjs/common';
import { AccountsService } from './services/accounts.service';
import { AccountsController } from './controllers/accounts.controller';
import { PrismaClientLibraryModule } from '@app/prisma-client-library';
import { UsersRepository } from './repositories/users.repository';
import { UsersInfoRepository } from './repositories/users-info.repository';

@Module({
  imports: [PrismaClientLibraryModule],
  controllers: [AccountsController],
  providers: [AccountsService, UsersRepository, UsersInfoRepository],
})
export class AccountsModule {}
