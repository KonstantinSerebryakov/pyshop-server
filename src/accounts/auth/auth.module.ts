import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from '@app/shared-jwt/jwt/jwt.config';
import { SharedJwtModule } from '@app/shared-jwt';
import { OAuthController } from './controllers/oauth.controller';
import { GoogleService } from './services/google.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync(getJWTConfig()),
    SharedJwtModule,
  ],
  controllers: [AuthController, OAuthController],
  providers: [AuthService, GoogleService],
})
export class AuthModule {}
