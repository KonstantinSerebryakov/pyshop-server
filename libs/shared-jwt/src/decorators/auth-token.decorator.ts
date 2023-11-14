import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const header = request.headers['authorization'];

    if (!header) {
      return null;
    }

    const [, token] = header.split(' ');

    return token;
  },
);
