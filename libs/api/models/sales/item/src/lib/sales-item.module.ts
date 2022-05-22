import { Module } from '@nestjs/common';
import DBItemOptions from './db/item.database';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  SaleItemCategoryRepository, SaleItemEmployeeRepository, SaleItemPriceRepository,
  SaleItemRepository,
} from './classes/sales-item.repository';
import { SalesItemService } from './sales-item-service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleItemRepository, SaleItemCategoryRepository,SaleItemPriceRepository,SaleItemEmployeeRepository]),
  ],
  providers: [SalesItemService],
  exports: [SalesItemService],
})
export class SellItemModule {
  static dbSettings = DBItemOptions;
}
