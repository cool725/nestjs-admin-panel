import { ConnectionOptions } from 'typeorm';
import { BusinessEntity } from '../entities/business.entity';
import { BusinessUserRolesEntity } from '../entities/business.users.roles.entity.app';
import { InitialBusinessSeeds } from './seeds/business.seeds';
import { doSeed } from '../../../common/db/seed';
import { AuthLogin, AuthUser } from '@movit/api/auth';
import {BusinessTableIndexEntity} from "../entities/business.table.index.entity";

const BusinessDBOptions = <ConnectionOptions>{
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
  entities: [BusinessEntity, BusinessUserRolesEntity,BusinessTableIndexEntity],
};

doSeed([InitialBusinessSeeds], BusinessDBOptions, [AuthUser, AuthLogin]);

export default BusinessDBOptions;
