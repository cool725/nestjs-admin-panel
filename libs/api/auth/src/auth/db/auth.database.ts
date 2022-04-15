import { ConnectionOptions, createConnection } from 'typeorm';
import * as path from 'path';
import { AuthLogin } from '../entities/auth.entity.login';
import { AuthUser } from '../entities/auth.entity.user';
import { AuthUserInvited } from '../entities/auth.entity.user.invited';
import { InitialUserSeeds } from './seeds/auth.seeds';
import { InitialLayoutSeeds } from './seeds/auth.template.seeds';
import { AuthTemplate } from '../entities/auth.entity.templates';
import { doSeed } from '../../../../common/db/seed';

const DBAuthOptions = <ConnectionOptions>{
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
  cli: {
    migrationsDir: path.resolve('./migrations'),
  },
  entities: [AuthUser, AuthLogin, AuthUserInvited, AuthTemplate],
};

doSeed([InitialUserSeeds, InitialLayoutSeeds], DBAuthOptions);

export default DBAuthOptions;
