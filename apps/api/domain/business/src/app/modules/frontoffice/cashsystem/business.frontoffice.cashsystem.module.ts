import { Module } from '@nestjs/common';
import { CashSystemModule } from "@movit/api/models/cashsystem";
import {BusinessFrontofficeCashSystemSettingsController} from "./business.frontoffice.cashsystem-settings.controller";

@Module({
  imports: [
      CashSystemModule
  ],
  controllers: [
    BusinessFrontofficeCashSystemSettingsController
  ],
  providers: [

  ],
})
export class BusinessFrontOfficeCashSystemModule {}
