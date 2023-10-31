import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '@app/shared-jwt/jwt.config';

@Module({
  imports: [UsersModule, JwtModule.registerAsync(getJWTConfig())],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
