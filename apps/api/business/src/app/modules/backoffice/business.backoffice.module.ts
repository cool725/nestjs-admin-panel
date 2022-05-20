import { Module } from '@nestjs/common';
import { BusinessBackOfficeController } from './business.backoffice.controller';
import { BusinessBackofficeSalesItemsModule } from './sales/items/business.backoffice.sales.items.module';

@Module({
  imports: [BusinessBackofficeSalesItemsModule],
  controllers: [BusinessBackOfficeController],
  providers: [],
})
export class BusinessBackOfficeModule {}
