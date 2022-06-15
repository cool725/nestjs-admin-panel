import { Module } from '@nestjs/common';
import {BusinessFinancesSettingsModule} from "./settings/business.finances.settings.module";

@Module({
  imports: [ BusinessFinancesSettingsModule],
  controllers: [],
  providers: [],
})
export class BusinessFinancesModule {}
