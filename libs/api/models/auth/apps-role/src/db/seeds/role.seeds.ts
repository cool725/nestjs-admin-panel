import { Connection } from 'typeorm';
import { SeedHelper } from '../../../../../../common/db/seed';
import { AppsEntity } from '../../entities/start.entity.app';
import { AuthUserEntity } from '@movit/api/auth';
import { AppsUserRightEntity } from '../../entities/start.entity.user.rights';
import { AppsRoleEntity } from '../../entities/start.entity.role.app';
import { CompanyEntity } from '../../../../../company/src/entities/companyEntity';

export class InitialAppRoleSeeds extends SeedHelper {
  migrationName: string = this.constructor.name;

  migrationDelay = 3000;

  getDefaultUser(): Promise<AuthUserEntity> {
    return AuthUserEntity.findOne({
      where: {
        email: process.env.APP_DEFAULT_USER,
      },
    });
  }

  getDefaultCompany(): Promise<CompanyEntity> {
    return CompanyEntity.findOne({
      where: {
        titleFull: 'MovIT:Demo',
      },
    });
  }

  public async doSeed(queryRunner: Connection): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<boolean>(async (resolve) => {
      const user = await this.getDefaultUser();
      const company = await this.getDefaultCompany();
      if (!user || !company) return resolve(false);

      const role = AppsRoleEntity.create();
      role.title = 'root';
      role.domain = 'business';
      role.companyId = company.companyId;
      await role.save();

      const userRight = AppsUserRightEntity.create();
      userRight.userId = user.userId;
      userRight.role = role;
      userRight.companyId = company.companyId;
      await userRight.save();

      role.users = [userRight];
      await role.save();

      const apps = await AppsEntity.find();

      for (let i = 0; i < apps.length; i++) {
        await AppsEntity.query(
          `
           insert into app_role_rights
               (companyId , roleId , appId, access )
               values (${this.getParameterPlaceHolders(4)})
          `,

          [company.companyId, role.roleId, apps[i].appId, 'root']
        );
      }

      return resolve(true);
    });
  }
}
