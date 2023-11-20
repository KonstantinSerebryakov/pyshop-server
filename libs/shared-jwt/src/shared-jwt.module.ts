import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJWTConfig } from './jwt/jwt.config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtRefreshableService } from './services/jwt-refreshable.service';
import { RefreshTokensRepository } from './repositories/refresh-tokens.repository';
import { PrismaClientLibraryModule } from '@app/prisma-client-library';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync(getJWTConfig()),
    PassportModule,
    PrismaClientLibraryModule,
  ],
  providers: [JwtStrategy, JwtRefreshableService, RefreshTokensRepository],
  exports: [JwtStrategy, JwtRefreshableService],
})
export class SharedJwtModule {}
