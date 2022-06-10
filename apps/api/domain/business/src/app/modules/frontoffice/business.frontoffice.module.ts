import { Module } from '@nestjs/common';
import { BusinessFrontOfficeProfilesModule } from './crm/profiles/business.frontoffice.profiles.module';
import { BusinessFrontOfficeAgendaModule } from './agenda/business.frontoffice.agenda.module';
import { BusinessFrontOfficeCashSystemModule } from "./cashsystem/business.frontoffice.cashsystem.module";

@Module({
  imports: [BusinessFrontOfficeProfilesModule, BusinessFrontOfficeAgendaModule,BusinessFrontOfficeCashSystemModule],
  controllers: [],
  providers: [],
})
export class BusinessFrontOfficeModule {}
