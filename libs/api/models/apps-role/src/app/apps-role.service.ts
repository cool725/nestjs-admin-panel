import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StartRepositoryApps } from './classes/start.repository.apps';
import { AppRoleRepositoryApps } from './classes/repository.roles';
import { AppsRoleRightsEntity } from './entities/start.entity.role.rights';
import { AppsUserRightEntity } from './entities/start.entity.user.rights';
import { AppsRoleEntity } from './entities/start.entity.role.app';

interface DTOApps {
  domain?: string;
  companyId?: number;
  userId?: any;
}

@Injectable()
export class AppRoleService {
  constructor(
    @InjectRepository(StartRepositoryApps)
    private appsRepo: StartRepositoryApps,
    @InjectRepository(AppRoleRepositoryApps)
    private roleRepo: AppRoleRepositoryApps
  ) {}

  public getPublicApps(options: DTOApps) {
    return this.appsRepo.getPublicApps(options);
  }

  public getBusinessApps(options: DTOApps) {
    return this.appsRepo.getBusinessAppsSimple(options);
  }

  public geAppsAsMenu(options: DTOApps) {
    return this.appsRepo.getAppsAsMenu(options);
  }

  public getBusinessRoles(businessId: number) {
    return this.roleRepo.getBusinessRolesByBusinessId(businessId);
  }

  public findBusinessRole(roleId, businessId) {
    return this.roleRepo.getBusinessRoleByBusinessId(businessId, roleId);
  }

  public createBusinessRole(role) {
    return this.roleRepo.createRole(role);
  }

  public updateBusinessRole(role) {
    return this.roleRepo.updateRole(role);
  }

  public deleteRole(businessId, roleId) {
    return this.roleRepo.deleteRole(businessId, roleId);
  }
  public deleteAppsFromRole(appRole: AppsRoleEntity) {
    return AppsRoleRightsEntity.delete({
      companyId: appRole.companyId,
      roleId: appRole.roleId,
    });
  }
  public deleteUsersFromRole(appRole: AppsRoleEntity) {
    return AppsUserRightEntity.delete({
      companyId: appRole.companyId,
      role: {
        roleId: appRole.roleId,
      },
    });
  }

  public async saveAppsToRole(
    appRole: AppsRoleEntity,
    apps: { access: string; appId: number }[]
  ) {
    for (let i = 0; i < apps.length; i++) {
      const appRights = AppsRoleRightsEntity.create();
      appRights.roleId = appRole.roleId;
      appRights.companyId = appRole.companyId;
      appRights.appId = apps[i].appId;
      appRights.access = apps[i].access;
      await appRights.save();
    }
  }

  public async saveUsersToRole(appRole: AppsRoleEntity, usersIds: string[]) {
    for (let i = 0; i < usersIds.length; i++) {
      const userId = usersIds[i];
      const userRight = AppsUserRightEntity.create();
      userRight.userId = userId;
      userRight.role = appRole;
      userRight.companyId = appRole.companyId;
      await userRight.save();
    }
  }
}
