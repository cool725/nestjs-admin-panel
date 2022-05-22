import { ConnectionOptions } from 'typeorm';
import * as path from 'path';
import { SaleItemEntity } from '../entities/sale.entity.item';
import { SaleItemCategoryEntity } from '../entities/sale.entity.item-category';
import { SaleItemCategoryLinkEntity } from '../entities/sale.entity.item-category.link';
import { SaleItemPriceEntity } from '../entities/sale.entity.item.price';
import {SaleItemEmployeeEntity} from "../entities/sale.entity.item.employee";

const DBItemOptions = <ConnectionOptions>{
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 0),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  migrationsRun: true,
  logger: 'file',
  cli: {
    migrationsDir: path.resolve('./migrations'),
  },
  entities: [
    SaleItemEntity,
    SaleItemCategoryEntity,
    SaleItemCategoryLinkEntity,
    SaleItemPriceEntity,
    SaleItemEmployeeEntity
  ],
};

export default DBItemOptions;
