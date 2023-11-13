import { PARAM_USER_ID } from '@app/interfaces/url-params/params';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class ResourceAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.user;
    if (!userId)
      throw new InternalServerErrorException(
        'ResourceAccessGuard should be defined after jwt guard',
      );

    const resourceId = request.params[PARAM_USER_ID];

    if (userId !== resourceId) {
      throw new ForbiddenException('You do not have access to this resource');
    }

    return true;
  }
}
