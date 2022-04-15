import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppRoleService } from '@movit/api/app';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser, CompanyGuard, GetUser } from '@movit/api/auth';
import { GetCompany } from '../../../../../../libs/api/business/src/business.decorator';

@Controller()
@UseGuards(AuthGuard(), CompanyGuard)
export class BusinessAppsController {
  constructor(private readonly appsService: AppRoleService) {}

  @Get('getApps')
  getData(@GetCompany() business, @GetUser() authUser: AuthUser) {
    return this.appsService.geAppsAsMenu({
      domain: 'business',
      companyId: business.businessId,
      userId: authUser.userId,
    });
  }
}
