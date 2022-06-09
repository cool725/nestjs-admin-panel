import { Module } from '@nestjs/common';
import { CashSystemModule } from "@movit/api/models/cashsystem";
import {BusinessFrontofficeCashSystemSettingsController} from "./business.frontoffice.cashsystem-settings.controller";
import {SellItemModule} from "@movit/api/sales/item";
import { BusinessFrontofficeCashSystemItemsController } from "./business.frontoffice.cashsystem-items.controller";
import { BusinessFrontofficeCashSystemController } from "./business.frontoffice.cashsystem.controller";

@Module({
  imports: [
      CashSystemModule,
      SellItemModule
  ],
  controllers: [
    BusinessFrontofficeCashSystemController,
    BusinessFrontofficeCashSystemSettingsController,
    BusinessFrontofficeCashSystemItemsController
  ],
  providers: [

  ],
})
export class BusinessFrontOfficeCashSystemModule {}
