import { JWTAuthGuard, UserId } from '@app/shared-jwt';
import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersRepository } from '../repositories/users.repository';
import { ResourceAccessGuard } from '@app/shared-jwt/user-access.guard';
import { UserResponseDto } from '../dto/user-response.dto';

const PARAM_USER_ID = 'userid';

@ApiTags('Users')
@Controller(`users/:${PARAM_USER_ID}`)
export class UsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiOkResponse({
    type: UserResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'you do not have permission to access this resource',
  })
  @UseGuards(JWTAuthGuard)
  @UseGuards(ResourceAccessGuard)
  @Get()
  async getByUserId(
    @Param(PARAM_USER_ID) requestedUserId: string,
    @UserId() userId: string,
  ) {
    const data = await this.usersRepository.findOneById(requestedUserId); // prettier-ignore
    if (!data) throw new NotFoundException();

    return data.getPublic();
  }
}
