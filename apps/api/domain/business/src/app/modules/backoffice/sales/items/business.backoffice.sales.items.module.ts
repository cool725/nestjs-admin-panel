import { Module } from '@nestjs/common';
import { BusinessBackOfficeSalesItemsProductController } from './business.backoffice.sales.items.product.controller';
import { BusinessBackOfficeSalesItemsServiceController } from './business.backoffice.sales.items.service.controller';
import { SellItemModule } from '@movit/api/sales/item';
import {BusinessBackOfficeSalesItemsController} from "./business.backoffice.sales.items.controller";
import { ProfilesModule } from "@movit/api/profiles";

@Module({
  imports: [SellItemModule,ProfilesModule],
  controllers: [
    BusinessBackOfficeSalesItemsController,
    BusinessBackOfficeSalesItemsServiceController,
    BusinessBackOfficeSalesItemsProductController,
  ],
  providers: [],
})
export class BusinessBackofficeSalesItemsModule {}
