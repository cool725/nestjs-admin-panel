import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { AppsRoleEntity } from '../entities/start.entity.role.app';
import { AppsUserRightEntity } from '../entities/start.entity.user.rights';
import { AppsRoleRightsEntity } from '../entities/start.entity.role.rights';

@EntityRepository(AppsRoleEntity)
export class AppRoleRepositoryApps extends Repository<AppsRoleEntity> {
  constructor() {
    super();
  }

  protected countUserFromRole(companyId, roleId) {
    return this.query(
      `select count(*) as count from app_user_rights where companyId = ? and roleId = ? `,
      [companyId, roleId]
    ).then((results) => (results ? +results[0].count : 0));
  }

  public getBusinessRoleByBusinessId(
    companyId: number,
    roleId: number,
    options: any = { details: true }
  ) {
    return this.createQueryBuilder('app_role')
      .where(
        'domain = "business" and companyId = :companyId and roleId = :roleId',
        { companyId, roleId }
      )
      .limit(1)
      .getOne()
      .then(async (role: any) => {
        if (role && options.details) {
          role.users = await AppsUserRightEntity.find({
            where: { companyId: companyId, role: { roleId: roleId } },
          });
          role.apps = await AppsRoleRightsEntity.find({
            where: { companyId: companyId, roleId: roleId },
          });
        }
        return role;
      });
  }

  public getBusinessRolesByBusinessId(companyId: number) {
    return this.createQueryBuilder('app_role')
      .where('domain = "business" and companyId = :companyId', { companyId })
      .getMany()
      .then(async (rows) => {
        for (let i = 0; i < rows.length; i++) {
          const row: any = rows[i];
          row.countUser = await this.countUserFromRole(
            row.companyId,
            row.roleId
          );
        }
        return rows;
      });
  }

  public createRole(values: Partial<AppsRoleEntity>): Promise<AppsRoleEntity> {
    const role = this.create();
    role.title = values.title;
    role.domain = 'business';
    role.type = values.type || 'domain';
    role.companyId = values.companyId || values['businessId'];
    return role.save();
  }

  public async updateRole(
    values: Partial<AppsRoleEntity>
  ): Promise<AppsRoleEntity> {
    const role = await this.getBusinessRoleByBusinessId(
      values.companyId,
      values.roleId,
      {}
    );
    role.title = values.title;
    role.domain = values.domain || role.domain;
    return role.save();
  }

  public async deleteRole(
    businessId: number,
    roleId: number
  ): Promise<DeleteResult> {
    return this.delete({
      companyId: businessId,
      roleId: roleId,
    });
  }
}
