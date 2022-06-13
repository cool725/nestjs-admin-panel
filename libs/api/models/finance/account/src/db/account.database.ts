import { ConnectionOptions } from 'typeorm';
import { FinAccountEntity } from '../entities/account.entity.app';
import { FinAccountCategoryEntity } from '../entities/account.category.entity.app';
import { FinAccountTaxEntity } from '../entities/account.tax.entity.app';

const AccountDBOptions = <ConnectionOptions>{
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 0),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  migrationsRun: true,
  multipleStatements: true,
  logger: 'file',
  entities: [FinAccountEntity, FinAccountCategoryEntity, FinAccountTaxEntity],
};

export default AccountDBOptions;
