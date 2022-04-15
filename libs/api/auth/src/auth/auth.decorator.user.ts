import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from './entities/auth.entity.user';

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    const { user } = ctx.switchToHttp().getRequest();
    return user;
  }
);
