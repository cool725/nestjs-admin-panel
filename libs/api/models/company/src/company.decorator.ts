import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CompanyEntity } from './entities/companyEntity';

// todo rename to get Business
export const GetCompany = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CompanyEntity => {
    const req = ctx.switchToHttp().getRequest();
    if (!req.user || !req._company) return null;
    if (req.company) return req.company;
    req.company = new CompanyEntity(req._company);
    return req.company;
  }
);
