import { JWTAuthGuard, UserId } from '@app/shared-jwt';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';

@Controller('users/info')
export class UsersInfoController {
  constructor() {}

  @UseGuards(JWTAuthGuard)
  @Get()
  async get(@UserId() userId: string) {
    console.log(userId);
    return userId;
  }

  @UseGuards(JWTAuthGuard)
  @Get('name')
  async getNameField(@UserId() userId: string) {}

  @UseGuards(JWTAuthGuard)
  @Get('phone')
  async getPhoneField(@UserId() userId: string) {}

  @UseGuards(JWTAuthGuard)
  @Get('address')
  async getAddressField(@UserId() userId: string) {}

  @UseGuards(JWTAuthGuard)
  @Get('about')
  async getAboutField(@UserId() userId: string) {}

  @UseGuards(JWTAuthGuard)
  @Put()
  async updateAllFields(@UserId() userId: string) {}

  @UseGuards(JWTAuthGuard)
  @Patch()
  async updateFields(@UserId() userId: string) {}

  @UseGuards(JWTAuthGuard)
  @Delete()
  async deleteAllFields(@UserId() userId: string) {}

  @UseGuards(JWTAuthGuard)
  @Delete('name')
  async deleteNameField(@UserId() userId: string) {}

  @UseGuards(JWTAuthGuard)
  @Delete('phone')
  async deletePhoneField(@UserId() userId: string) {}

  @UseGuards(JWTAuthGuard)
  @Delete('address')
  async deleteAddressField(@UserId() userId: string) {}

  @UseGuards(JWTAuthGuard)
  @Delete('about')
  async deleteAboutField(@UserId() userId: string) {}
}
