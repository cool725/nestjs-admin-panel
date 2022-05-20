import { Module } from '@nestjs/common';
import { BusinessBackOfficeSalesItemsProductController } from './business.backoffice.sales.items.product.controller';
import { BusinessBackOfficeSalesItemsServiceController } from './business.backoffice.sales.items.service.controller';
import { SellItemModule } from '@movit/api/sales/item';

@Module({
  imports: [SellItemModule],
  controllers: [
    BusinessBackOfficeSalesItemsServiceController,
    BusinessBackOfficeSalesItemsProductController,
  ],
  providers: [],
})
export class BusinessBackofficeSalesItemsModule {}
