import { Module } from '@nestjs/common';
import { CashSystemModule } from "@movit/api/models/cashsystem";
import {SellItemModule} from "@movit/api/sales/item";
import { ProfilesModule } from "@movit/api/profiles";

import {BusinessFrontofficeCashSystemSettingsController} from "./business.frontoffice.cashsystem-settings.controller";
import { BusinessFrontofficeCashSystemItemsController } from "./business.frontoffice.cashsystem-items.controller";
import { BusinessFrontofficeCashSystemController } from "./business.frontoffice.cashsystem.controller";
import { BusinessFrontofficeCashSystemProfilesController } from "./business.frontoffice.cashsystem-profiles.controller";


@Module({
  imports: [
      CashSystemModule,
      SellItemModule,
      ProfilesModule,
  ],
  controllers: [
    BusinessFrontofficeCashSystemController,
    BusinessFrontofficeCashSystemSettingsController,
    BusinessFrontofficeCashSystemItemsController,
    BusinessFrontofficeCashSystemProfilesController
  ],
  providers: [

  ],
})
export class BusinessFrontOfficeCashSystemModule {}
