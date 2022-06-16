import { Module } from '@nestjs/common';
import { CashSystemModule } from "@movit/api/models/cashsystem";
import {SellItemModule} from "@movit/api/sales/item";
import { ProfilesModule } from "@movit/api/profiles";

 import { BusinessFrontOfficeCashSystemItemsController } from "./business-front-office-cash-system-items.controller";
import { BusinessFrontOfficeCashSystemController } from "./business.frontoffice.cashsystem.controller";
import { BusinessFrontOfficeCashSystemProfilesController } from "./business-front-office-cash-system-profiles.controller";
import {AccountModule} from "@movit/api/finance/account";


@Module({
  imports: [
      CashSystemModule,
      SellItemModule,
      ProfilesModule,
      AccountModule
  ],
  controllers: [
    BusinessFrontOfficeCashSystemController,
    BusinessFrontOfficeCashSystemItemsController,
    BusinessFrontOfficeCashSystemProfilesController
  ],
  providers: [

  ],
})
export class BusinessFrontOfficeCashSystemModule {}
