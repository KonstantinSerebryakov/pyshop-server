import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/accounts/users/entities/user.entity';
import { UsersRepository } from 'src/accounts/users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, password }) {
    const existedUser = await this.usersRepository.findOneByEmail(email);
    if (existedUser) {
      throw new ConflictException(
        'Email already in use. Please use a different email address.',
      );
    }
    const userEntity = UserEntity.Empty;
    userEntity.email = email;
    await userEntity.setPassword(password);

    const storedUserEntity = await this.usersRepository.createOne(userEntity);
    return { user: await storedUserEntity.getPublic() };
  }

  async login({ email, password }) {
    const userEntity = await this.usersRepository.findOneByEmail(email);
    await this.validateLogin(userEntity, password);

    const jwt_token = await this.jwtService.signAsync({ id: userEntity.id });

    return {
      user: await userEntity.getPublic(),
      token: jwt_token,
    };
  }

  async validateLogin(userEntity: UserEntity, password: string) {
    if (!userEntity) {
      throw new NotFoundException('User with this email does not exist.');
    }

    const isCorrectPassword = await userEntity.validatePassword(password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(
        'Authentication failed. The password is incorrect.',
      );
    }
  }
}
