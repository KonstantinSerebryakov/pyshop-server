import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/accounts/users/entities/user.entity';
import { UsersRepository } from 'src/accounts/users/repositories/users.repository';
import { RefreshTokensRepository } from '../../../../libs/shared-jwt/src/repositories/refresh-tokens.repository';
import { JwtRefreshableService } from '@app/shared-jwt/services/jwt-refreshable.service';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly jwtServiceShared: JwtRefreshableService,
  ) {}

  async register({ email, password }) {
    const existedUser = await this.usersRepository.findOneByEmail(email);
    if (existedUser) {
      throw new ConflictException(
        'Email already in use. Please use a different email address.',
      );
    }

    const userEntity = new UserEntity({ email: email });
    await userEntity.setPassword(password);

    const storedUserEntity = await this.usersRepository.createOne(userEntity);
    return { user: await storedUserEntity.getPublic() };
  }

  async login(loginDto: LoginDto) {
    const userEntity = await this.usersRepository.findOneByEmail(
      loginDto.email,
    );
    if (!userEntity || !userEntity.id) {
      throw new UnauthorizedException(
        'Authorization failed. The password or email are incorrect.',
      );
    }
    await userEntity.validatePassword(loginDto.password);

    const { accessToken, refreshToken } =
      await this.jwtServiceShared.generateTokens(
        userEntity.id ?? '',
        loginDto.deviceId,
      );

    return {
      user: await userEntity.getPublic(),
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
