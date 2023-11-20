import { JWTAuthGuard, UserId } from '@app/shared-jwt';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Res,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { UsersInfoRepository } from '../repositories/users-info.repository';
import { UpdateUserInfoDto } from '../dto/update-users-info.dto';
import { UserInfoEntity } from '../entities/user-info.entity';
import { Response } from 'express';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserInfoResponseDto } from '../dto/users-info-response.dto';
import {
  PARAM_USER_ID,
  PARAM_USER_INFO_ID,
} from '@app/interfaces/url-params/params';
import { ResourceAccessGuard } from '@app/shared-jwt/guards/user-access.guard';

@ApiTags('Users/Info')
@Controller(`users/:${PARAM_USER_ID}/info`)
export class UsersInfoController {
  constructor(private readonly usersInfoRepository: UsersInfoRepository) {}

  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiOkResponse({
    type: UserInfoResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'You do not have access to this resource',
  })
  @UseGuards(JWTAuthGuard, ResourceAccessGuard)
  @Get()
  async getByUserId(@Param(PARAM_USER_ID) requestedUserId: string) {
    const data = await this.usersInfoRepository.findOneByUserId(requestedUserId); // prettier-ignore
    if (!data) throw new NotFoundException();

    return data;
  }

  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiOkResponse({
    type: UserInfoResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'You do not have access to this resource',
  })
  @UseGuards(JWTAuthGuard, ResourceAccessGuard)
  @Get(`:${PARAM_USER_INFO_ID}`)
  async getByResourceId(
    @Param(PARAM_USER_ID) requestedUserId: string,
    @Param(PARAM_USER_INFO_ID) requestedResourceId: string,
  ) {
    const data = await this.usersInfoRepository.findOneById(requestedResourceId, requestedUserId); // prettier-ignore
    if (!data) throw new NotFoundException();

    return data;
  }

  @ApiCreatedResponse({
    type: UserInfoResponseDto,
    headers: { ContentLocation: { description: 'users/:userId/info' } },
  })
  @ApiConflictResponse({
    description:
      'There is a unique constraint violation, a new user cannot be created with this email',
  })
  @ApiForbiddenResponse({
    description: 'You do not have access to this resource',
  })
  @UseGuards(JWTAuthGuard, ResourceAccessGuard)
  @Post() // resourceId is required crutch to identify if update or create happened
  async createOneUnique(
    @Param(PARAM_USER_ID) requestedUserId: string,
    @Body() payload: UpdateUserInfoDto,
    @UserId() userId: string,
  ) {
    const entity = new UserInfoEntity({ ...payload, userId: userId });
    // await entity.fillOptionalNullables();
    const result = await this.usersInfoRepository.createOne(entity);
    return result;
  }

  @ApiOkResponse({
    type: UserInfoResponseDto,
    headers: { ContentLocation: { description: 'users/:userId/info' } },
  })
  @ApiCreatedResponse({
    type: UserInfoResponseDto,
    headers: { ContentLocation: { description: 'users/:userId/info' } },
  })
  @ApiConflictResponse({
    description:
      'The resource could not be updated or created.' +
      ' Given resource id is not valid or outdated.' +
      ' Please retrieve the latest version and try again.' +
      'Possibly Race problem has been occured:' +
      'https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#unique-key-constraint-errors-on-upserts',
  })
  @ApiForbiddenResponse({
    description: 'You do not have access to this resource',
  })
  @UseGuards(JWTAuthGuard, ResourceAccessGuard)
  @Put(`:${PARAM_USER_INFO_ID}`) // resourceId is required crutch to identify if update or create happened
  async updateAllFields(
    @Param(PARAM_USER_ID) requestedUserId: string,
    @Param(PARAM_USER_INFO_ID) requestedResourceId: string,

    @Body() payload: UpdateUserInfoDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(null);
      }, 1000);
    });
    const entity = new UserInfoEntity({ ...payload, userId: requestedUserId });
    await entity.fillOptionalNullables();
    const result = await this.usersInfoRepository.upsertOneById(
      requestedResourceId,
      requestedUserId,
      entity,
    );
    const status = result.id === requestedResourceId ? 200 : 201;
    res.status(status);
    res.setHeader('Content-location', `users/${result.userId}/info`);
    return result;
  }

  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiOkResponse({
    type: UserInfoResponseDto,
  })
  @UseGuards(JWTAuthGuard, ResourceAccessGuard)
  @Patch(`:${PARAM_USER_INFO_ID}`)
  async updatePartialFields(
    @Param(PARAM_USER_ID) requestedUserId: string,
    @Param(PARAM_USER_INFO_ID) requestedResourceId: string,

    @Body() payload: UpdateUserInfoDto,
  ) {
    const result = await this.usersInfoRepository.updateOneById(
      requestedResourceId,
      requestedUserId,
      new UserInfoEntity({ ...payload, userId: requestedUserId }),
    );
    if (!result) throw new NotFoundException();
    return result;
  }

  @ApiNoContentResponse({
    description: 'No Content',
  })
  @UseGuards(JWTAuthGuard, ResourceAccessGuard)
  @Delete(`:${PARAM_USER_INFO_ID}`)
  async delete(
    @Param(PARAM_USER_ID) requestedUserId: string,
    @Param(PARAM_USER_INFO_ID) requestedResourceId: string,
  ) {
    this.usersInfoRepository.deleteOneById(
      requestedResourceId,
      requestedUserId,
    );
  }
}
