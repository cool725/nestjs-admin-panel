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
import { Settings } from '../../business.settings.namespace';
import { GetCompany } from '../../../../../../../../../libs/api/business/src/business.decorator';
import { BusinessEntity } from '../../../../../../../../../libs/api/business/src/entities/business.entity';
import { BusinessService } from '@movit/api/business';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '@movit/api/auth';
import { AppRoleService } from '@movit/api/app';
import { AppsRoleRightsEntity } from '../../../../../../../../../libs/api/apps-role/src/app/entities/start.entity.role.rights';
import { AppsUserRightEntity } from '../../../../../../../../../libs/api/apps-role/src/app/entities/start.entity.user.rights';

@Controller(Settings.resolePath(Settings.User.RolePATH))
@UseGuards(AuthGuard(), CompanyGuard)
export class BusinessSettingsRoleController {
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
    return this.appRoleService.getBusinessApps({
      domain: null,
      companyId: business.businessId,
    });
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
