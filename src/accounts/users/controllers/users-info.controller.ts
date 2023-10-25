import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

@Controller('user/info')
export class UsersInfoController {
  constructor() {}

  @Get()
  async get() {}

  @Get('name')
  async getNameField() {}

  @Get('phone')
  async getPhoneField() {}

  @Get('address')
  async getAddressField() {}

  @Get('about')
  async getAboutField() {}

  @Put()
  async updateAllFields() {}

  @Patch()
  async updateFields() {}

  @Delete()
  async deleteAllFields() {}

  @Delete('name')
  async deleteNameField() {}

  @Delete('phone')
  async deletePhoneField() {}

  @Delete('address')
  async deleteAddressField() {}

  @Delete('about')
  async deleteAboutField() {}
}
