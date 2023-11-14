import {
  IJWTPayloadAccess,
  IJWTPayloadBase,
  IJWTPayloadRefresh,
} from '@app/interfaces/interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { v4 as getUuidV4 } from 'uuid';

const date = new Date();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET ?? getUuidV4().toString(),
    });
  }

  async validate({
    id,
    exp,
  }: IJWTPayloadBase & (IJWTPayloadAccess | IJWTPayloadRefresh)) {
    const currentTimestamp = date.getTime() / 1000;
    if (exp < currentTimestamp) {
      throw new UnauthorizedException('Token has expired');
    }

    return id;
  }
}
