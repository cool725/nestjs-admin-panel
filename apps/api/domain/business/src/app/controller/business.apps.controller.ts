import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppRoleService } from '@movit/api/apps';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserEntity, CompanyGuard, GetUser } from '@movit/api/auth';
import {ICompany, GetCompany} from '@movit/api/business';

@Controller()
@UseGuards(AuthGuard(), CompanyGuard)
export class BusinessAppsController {
  constructor(private readonly appsService: AppRoleService) {}

  @Get('getApps')
  getData(@GetCompany() company:ICompany, @GetUser() authUser: AuthUserEntity) {
    return this.appsService.geAppsAsMenu({
      domain: 'business',
      companyId: company.companyId || -1,
      userId: authUser.userId || -1,
    });
  }
}