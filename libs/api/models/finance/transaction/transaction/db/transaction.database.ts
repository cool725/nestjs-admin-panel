import { ConnectionOptions } from 'typeorm';
import { FinTransactionEntity } from '../entities/transaction.entity.app';

const TransactionDBOptions = <ConnectionOptions>{
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
  entities: [FinTransactionEntity],
};

export default TransactionDBOptions;
