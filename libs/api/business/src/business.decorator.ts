import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BusinessEntity } from './entities/business.entity';

export const GetCompany = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): BusinessEntity => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.user || !req._company) return null;
    if (req.company) return req.company;
    req.company = new BusinessEntity(req._company);
    return req.company;
  }
);
