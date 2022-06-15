import { Module } from '@nestjs/common';
import {
  BusinessFinancesSettingsAccountOverviewController
} from './business.finances.settings.account-overview.controller';

import {AccountModule} from "@movit/api/finance/account";

@Module({
  imports: [
      AccountModule
  ],
  controllers: [
    BusinessFinancesSettingsAccountOverviewController
  ],
  providers: [],
})
export class BusinessFinancesSettingsModule {}
