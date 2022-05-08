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
import { GetCompany } from '../../../../../../../../../libs/api/models/business/src/business.decorator';
import { BusinessEntity } from '../../../../../../../../../libs/api/models/business/src/entities/business.entity';
import { BusinessService } from '@movit/api/business';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '@movit/api/auth';
import { AppRoleService } from '@movit/api/app';
import { IsNull } from 'typeorm';

@Controller(Administration.resolePath(Administration.User.RolePATH))
@UseGuards(AuthGuard(), CompanyGuard)
export class BusinessAdministrationRoleController {
  constructor(
    private businessService: BusinessService,
    private appRoleService: AppRoleService
  ) {}

  @Get('getRoles')
  getRoles(@GetCompany() business: BusinessEntity) {
    return this.appRoleService.getBusinessRoles(business.businessId);
  }

  @Get('getApps')
  getApps(@GetCompany() business: BusinessEntity) {
    return Promise.all([
      this.appRoleService.getBusinessApps({
        domain: null,
        companyId: business.businessId,
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
    @GetCompany() business: BusinessEntity,
    @Param('roleId') roleId: number
  ) {
    return this.appRoleService.findBusinessRole(roleId, business.businessId);
  }

  @Post('createRole')
  async createRole(@GetCompany() business: BusinessEntity, @Body() params) {
    const appRole = await this.appRoleService.createBusinessRole({
      ...params,
      businessId: business.businessId,
    });

    const { apps, users } = params;
    this.appRoleService.saveAppsToRole(appRole, apps);
    this.appRoleService.saveUsersToRole(appRole, users);

    return appRole;
  }

  @Patch('updateRole/:roleId')
  async updateRole(
    @GetCompany() business: BusinessEntity,
    @Param('roleId') roleId,
    @Body() params
  ) {
    const appRole = await this.appRoleService.updateBusinessRole({
      ...params,
      businessId: business.businessId,
      companyId: business.businessId,
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
    @GetCompany() business: BusinessEntity,
    @Param('roleId') roleId
  ) {
    this.appRoleService.deleteAppsFromRole(<any>{
      companyId: business.businessId,
      roleId: roleId,
    });

    this.appRoleService.deleteUsersFromRole(<any>{
      companyId: business.businessId,
      roleId: roleId,
    });

    await this.appRoleService.deleteRole(business.businessId, roleId);
  }
}
