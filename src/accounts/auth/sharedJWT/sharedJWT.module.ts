// shared/shared.module.ts

import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JWTAuthGuard } from './jwt.guard';
import { UserId } from './user.decorator';
import { getJWTConfig } from './jwt.config';

@Global()
@Module({
  imports: [JwtModule.registerAsync(getJWTConfig()), PassportModule],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class SharedJWTModule {}
