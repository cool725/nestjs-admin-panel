import { Module } from '@nestjs/common';
import DBItemOptions from './db/item.database';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  SaleItemCategoryRepository,
  SaleItemRepository,
} from './classes/sales-item.repository';
import { SalesItemService } from './sales-item-service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleItemRepository, SaleItemCategoryRepository]),
  ],
  providers: [SalesItemService],
  exports: [SalesItemService],
})
export class SellItemModule {
  static dbSettings = DBItemOptions;
}
