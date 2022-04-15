import { ConnectionOptions } from 'typeorm';

import { AppsEntity } from '../entities/start.entity.app';
import { AppsCategoryEntity } from '../entities/start.entity.category';
import { AppsRoleEntity } from '../entities/start.entity.role.app';
import { AppsUserRightEntity } from '../entities/start.entity.user.rights';
import { AppsRoleRightsEntity } from '../entities/start.entity.role.rights';
import { doSeed } from '../../../../common/db/seed';
import { InitialAppsSeeds } from './seeds/apps.seeds';
import { InitialAppRoleSeeds } from './seeds/role.seeds';

const DBStartOptions = <ConnectionOptions>{
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 0),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  migrationsRun: true,
  logger: 'file',
  entities: [
    AppsCategoryEntity,
    AppsEntity,
    AppsRoleEntity,
    AppsUserRightEntity,
    AppsRoleRightsEntity,
  ],
};

doSeed([InitialAppsSeeds, InitialAppRoleSeeds], DBStartOptions);

export default DBStartOptions;
