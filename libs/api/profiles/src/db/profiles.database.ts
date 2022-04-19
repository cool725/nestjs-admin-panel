import { ConnectionOptions } from 'typeorm';

import { doSeed } from '../../../common/db/seed';
import {ProfileEntity} from "../entities/profile.entity";

const ProfilesDBOptions = <ConnectionOptions>{
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
  entities: [ProfileEntity],
};

doSeed([], ProfilesDBOptions);

export default ProfilesDBOptions;
