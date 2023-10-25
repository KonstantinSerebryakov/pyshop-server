import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { getJWTConfig } from './jwt.config';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [JwtModule.registerAsync(getJWTConfig()), PassportModule],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class SharedJwtModule {}
