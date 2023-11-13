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
import { RefreshTokensRepository } from '../repositories/refresh-tokens.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly jwtService: JwtService,
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

  private async generateAccessToken() {

  }
  private async generateRefreshToken() {
    
  }

  async login({ email, password }) {
    const userEntity = await this.usersRepository.findOneByEmail(email);
    if (!userEntity) {
      throw new UnauthorizedException(
        'Authorization failed. The password or email are incorrect.',
      );
    }

    await userEntity.validatePassword(password);
    const jwt_token = await this.jwtService.signAsync(
      { id: userEntity.id },
      // { expiresIn: 111 },
    );

    return {
      user: await userEntity.getPublic(),
      token: jwt_token,
    };
  }
}
