import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import { TranslationLabelEntity } from '../entities/translation.label.item';

const DBTranslationOptions = <ConnectionOptions>{
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
  entities: [TranslationLabelEntity],
};

export default DBTranslationOptions;
