import { Module } from '@nestjs/common';
import { CashSystemModule } from "@movit/api/models/cashsystem";
import {BusinessFrontofficeCashSystemSettingsController} from "./business.frontoffice.cashsystem-settings.controller";
import {SellItemModule} from "@movit/api/sales/item";

@Module({
  imports: [
      CashSystemModule,
      SellItemModule
  ],
  controllers: [
    BusinessFrontofficeCashSystemSettingsController
  ],
  providers: [

  ],
})
export class BusinessFrontOfficeCashSystemModule {}
