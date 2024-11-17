import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserRequest } from 'src/middlewares/security.middleware';

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as UserRequest;
  return request.session;
});
