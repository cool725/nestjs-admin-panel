import { Module } from '@nestjs/common';
import { BusinessFrontOfficeProfilesModule } from './crm/profiles/business.frontoffice.profiles.module';
import { BusinessFrontOfficeAgendaModule } from './agenda/business.frontoffice.agenda.module';

@Module({
  imports: [BusinessFrontOfficeProfilesModule, BusinessFrontOfficeAgendaModule],
  controllers: [],
  providers: [],
})
export class BusinessFrontOfficeModule {}
