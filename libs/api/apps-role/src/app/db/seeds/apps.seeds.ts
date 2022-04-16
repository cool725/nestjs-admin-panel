import { Connection } from 'typeorm';
import { SeedHelper } from '../../../../../common/db/seed';
import { AppsCategoryEntity } from '../../entities/start.entity.category';
import { AppsEntity } from '../../entities/start.entity.app';

export class InitialAppsSeeds extends SeedHelper {
  migrationName: string = this.constructor.name;

  categories = [
    {
      categoryId: 1,
      domain: 'start',
      companyId: null,
      title: 'start',
      parentCategoryId: null,
    },
    {
      categoryId: 2,
      domain: 'business',
      title: 'FrontOffice',
      parentCategoryId: null,
    },
    {
      categoryId: 3,
      domain: 'business',
      title: 'BackOffice',
      parentCategoryId: null,
    },
    {
      categoryId: 4,
      domain: 'business',
      title: 'Finanzen',
      parentCategoryId: null,
    },
    {
      categoryId: 5,
      domain: 'business',
      title: 'Administration',
      parentCategoryId: null,
    },
    {
      categoryId: 6,
      domain: 'business',
      title: 'usermanagement',
      parentCategoryId: 5,
    },
    {
      categoryId: 7,
      domain: 'business',
      title: 'items',
      parentCategoryId: 3,
    },
    {
      categoryId: 8,
      domain: 'business',
      title: 'sales',
      parentCategoryId: 7,
    },
  ];

  apps = [
    {
      appId: 2,
      domain: 'start',
      companyId: null,
      title: 'account',
      path: 'account.movit',
      categoryId: 1,
      img: '',
    },
    {
      appId: 3,
      domain: 'start',
      companyId: null,
      title: 'business',
      path: '/business/',
      categoryId: 1,
      img: '',
    },
    {
      appId: 4,
      domain: 'start',
      companyId: null,
      title: 'subscriptions',
      path: '/subscription/orders',
      categoryId: 1,
      img: '',
    },
    {
      appId: 11,
      domain: 'business',
      title: 'users',
      path: '/settings/user/overview',
      categoryId: 6,
      img: '',
    },
    {
      appId: 12,
      domain: 'business',
      title: 'role',
      path: '/settings/user/role',
      categoryId: 6,
      img: '',
    },
  ];

  public async doSeed(queryRunner: Connection): Promise<boolean> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<boolean>(async (resolve) => {
      for (let i = 0; i < this.categories.length; i++) {
        const cat = Object.assign(new AppsCategoryEntity(), this.categories[i]);
        await cat.save();
      }

      for (let i = 0; i < this.apps.length; i++) {
        const app = Object.assign(new AppsEntity(), this.apps[i]);
        app.categoryId = this.apps[i].categoryId;
        app.category = await AppsCategoryEntity.findOne(
          this.apps[i].categoryId
        );
        await app.save();
        console.log(await AppsCategoryEntity.findOne(this.apps[i].categoryId));
      }

      return resolve(true);
    });
  }
}
