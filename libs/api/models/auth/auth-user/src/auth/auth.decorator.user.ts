import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserEntity } from './entities/auth.entity.user';

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUserEntity => {
    const { user } = ctx.switchToHttp().getRequest();
    return user;
  }
);
