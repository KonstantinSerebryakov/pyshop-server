import {
  Controller,
  Post,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post()
  async register() {}

  @Post()
  async login() {}
}
