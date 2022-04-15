import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './../auth.service';
import { Connection } from 'typeorm';

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private connection: Connection
  ) {}

  getToken(request: any): string {
    if (request.headers['company']) {
      return request.headers['company'].split(' ')[1];
    }
    return request.cookies.ctk;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = this.getToken(request);

    if (!bearerToken) return false;

    const payload: any = this.authService.verifyJWTToken(bearerToken);

    if (!payload) return false;

    if (payload.userId == request.user.userId) {
      const query = await this.connection.query(
        `
         select com_company.* from com_company
         left join com_user_roles cur on com_company.businessId = cur.businessId
         where cur.userId = ? and com_company.businessId = ? limit 1
     `,
        [payload.userId, payload.companyId]
      );
      if (query && query[0]) {
        request._company = query[0]; // assign business/company obj to req
        return payload.companyId == request._company.businessId;
      }
    }

    return false;
  }
}
