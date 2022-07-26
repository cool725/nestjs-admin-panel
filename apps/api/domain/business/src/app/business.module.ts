import { Module } from '@nestjs/common';

import { BusinessAppsController } from './controller/business.apps.controller';
import { AppsModule } from '@movit/api/apps';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@movit/api/auth';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '@movit/api/business';
import { BusinessBackOfficeModule } from './modules/backoffice/business.backoffice.module';
import { BusinessAdministrationModule } from './modules/administration/business.administration.module';
import { BusinessController } from './controller/business.controller';
import { TranslationModule } from '@movit/api/translation';
import { BusinessFrontOfficeModule } from './modules/frontoffice/business.frontoffice.module';
import { ProfilesModule } from '@movit/api/profiles';
import { ReservationModule } from '@movit/api/reservation';
import { BusinessSettingsModule } from './modules/settings/business.settings.module';
import { SellItemModule } from '@movit/api/sales/item';
import { EmployeeModule } from "@movit/api/models/employee";
import { CashSystemModule } from "@movit/api/models/cashsystem";
import {AccountModule} from "@movit/api/finance/account";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...AppsModule.dbSettings,
      entities: [
        ...TranslationModule.dbSettings.entities,
        ...AppsModule.dbSettings.entities,
        ...AuthModule.dbSettings.entities,
        ...CompanyModule.dbSettings.entities,
        ...ProfilesModule.dbSettings.entities,
        ...EmployeeModule.dbSettings.entities,
        ...ReservationModule.dbSettings.entities,
        ...SellItemModule.dbSettings.entities,
        ...AccountModule.dbSettings.entities,
        ...CashSystemModule.dbSettings.entities,
      ],
    }),
    AuthModule,
    AppsModule,
    CompanyModule,
    EmployeeModule,
    BusinessFrontOfficeModule,
    BusinessBackOfficeModule,
    BusinessSettingsModule,
    BusinessAdministrationModule,
  ],
  controllers: [BusinessController, BusinessAppsController]
})
export class BusinessAPIModule {}
