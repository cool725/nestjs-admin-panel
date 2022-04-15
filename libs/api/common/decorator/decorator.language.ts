import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetLanguage = createParamDecorator(
  (data, ctx: ExecutionContext): number => {
    const req: any = ctx.switchToHttp().getRequest();
    return req.headers['lang'] || 1;
  }
);
