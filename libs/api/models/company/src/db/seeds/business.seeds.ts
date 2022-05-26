import { Connection } from 'typeorm';
import { SeedHelper } from '../../../../../common/db/seed';
import { CompanyEntity } from '../../entities/companyEntity';
import { AuthUserEntity } from '@movit/api/auth';
import { BusinessUserRolesEntity } from '../../entities/business.users.roles.entity.app';

export class InitialBusinessSeeds extends SeedHelper {
  migrationName: string = this.constructor.name;

  migrationDelay = 2000;

  getDefaultUser(): Promise<AuthUserEntity> {
    return AuthUserEntity.findOne({
      where: {
        email: process.env.APP_DEFAULT_USER,
      },
    });
  }

  public async doSeed(queryRunner: Connection): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<boolean>(async (resolve) => {
      if (!process.env.APP_DEFAULT_USER) return resolve(false);

      if (await CompanyEntity.findOne({ where: { titleFull: 'MovIT:Demo' } }))
        return resolve(false);

      const demo = CompanyEntity.create();
      demo.titleFull = 'MovIT:Demo';
      demo.taxIncomeId = 0;
      demo.taxExpenseId = 0;
      demo.logoSrc = 'https://i.ibb.co/X8m7CQk/320-132.png';
      await demo.save();

      const authUser = await this.getDefaultUser();
      if (authUser && authUser.email) {
        await CompanyEntity.query(
          `
           insert into ${
             BusinessUserRolesEntity.getRepository().metadata.tableName
           }
               (roles , userCreatedAt , companyId, userId )
               values (${this.getParameterPlaceHolders(4)})
          `,
          ['user', authUser.authCreatedAt, demo.companyId, authUser.userId]
        ).catch((e) => {
          console.log(e);
          demo.remove();
          resolve(false);
        });
      } else {
        demo.remove();
        return resolve(false);
      }

      console.log('Seed:', demo.titleFull);
      return resolve(true);
    });
  }
}
