import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Administration } from '../../business.administration.namespace';
import { GetCompany } from '../../../../../../../../../../libs/api/models/company/src/company.decorator';
import { CompanyEntity } from '../../../../../../../../../../libs/api/models/company/src/entities/companyEntity';
import {Company, CompanyService} from '@movit/api/business';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '@movit/api/auth';
import { AppRoleService } from "@movit/api/apps";

import { IsNull } from 'typeorm';

@Controller(Administration.resolePath(Administration.User.RolePATH))
@UseGuards(AuthGuard(), CompanyGuard)
export class BusinessAdministrationRoleController {
  constructor(
    private businessService: CompanyService,
    private appRoleService: AppRoleService
  ) {}

  @Get('getRoles')
  getRoles(@GetCompany() business: Company) {
    return this.appRoleService.getBusinessRoles(business.companyId);
  }

  @Get('getApps')
  getApps(@GetCompany() business: CompanyEntity) {
    return Promise.all([
      this.appRoleService.getBusinessApps({
        domain: null,
        companyId: business.companyId,
      }),
      this.appRoleService.getBusinessApps({
        domain: 'business',
        companyId: IsNull() as any,
      }),
    ])
      .then((rows) => [...rows[0], ...rows[1]])
      .then((apps) =>
        apps.map((app: any) => {
          app.categoryName = app?.category?.title; // todo get base category
          delete app.category;
          return app;
        })
      );
  }
  @Get('getRole/:roleId')
  getRole(
    @GetCompany() business: CompanyEntity,
    @Param('roleId') roleId: number
  ) {
    return this.appRoleService.findBusinessRole(roleId, business.companyId);
  }

  @Post('createRole')
  async createRole(@GetCompany() business: CompanyEntity, @Body() params) {
    const appRole = await this.appRoleService.createBusinessRole({
      ...params,
      businessId: business.companyId,
    });

    const { apps, users } = params;
    this.appRoleService.saveAppsToRole(appRole, apps);
    this.appRoleService.saveUsersToRole(appRole, users);

    return appRole;
  }

  @Patch('updateRole/:roleId')
  async updateRole(
    @GetCompany() business: CompanyEntity,
    @Param('roleId') roleId,
    @Body() params
  ) {
    const appRole = await this.appRoleService.updateBusinessRole({
      ...params,
      businessId: business.companyId,
      companyId: business.companyId,
      roleId: roleId,
    });

    await Promise.all([
      this.appRoleService.deleteAppsFromRole(appRole),
      this.appRoleService.deleteUsersFromRole(appRole),
    ]);

    const { apps, users } = params;

    this.appRoleService.saveAppsToRole(appRole, apps);
    this.appRoleService.saveUsersToRole(appRole, users);

    return appRole;
  }

  @Delete('deleteRole/:roleId')
  async deleteRole(
    @GetCompany() business: CompanyEntity,
    @Param('roleId') roleId
  ) {
    this.appRoleService.deleteAppsFromRole(<any>{
      companyId: business.companyId,
      roleId: roleId,
    });

    this.appRoleService.deleteUsersFromRole(<any>{
      companyId: business.companyId,
      roleId: roleId,
    });

    await this.appRoleService.deleteRole(business.companyId, roleId);
  }
}
