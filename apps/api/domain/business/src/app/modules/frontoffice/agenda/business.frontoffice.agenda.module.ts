import { Module } from '@nestjs/common';
import { BusinessFrontOfficeAgendaController } from './business.frontoffice.agenda-reservation.controller';
import { ReservationModule } from '@movit/api/reservation';
import { BusinessFrontofficeAgendaDataController } from './business.frontoffice.agenda-data.controller';
import { ProfilesModule } from '@movit/api/profiles';

@Module({
  imports: [ReservationModule, ProfilesModule],
  controllers: [
    BusinessFrontOfficeAgendaController,
    BusinessFrontofficeAgendaDataController,
  ],
  providers: [],
})
export class BusinessFrontOfficeAgendaModule {}
