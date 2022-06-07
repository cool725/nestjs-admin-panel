import { Module } from '@nestjs/common';
import { BusinessFrontOfficeAgendaController } from './business.frontoffice.agenda-reservation.controller';
import { ReservationModule } from '@movit/api/reservation';
import { BusinessFrontOfficeAgendaDataController } from './business-front-office-agenda-data.controller';
import { ProfilesModule } from '@movit/api/profiles';

@Module({
  imports: [ReservationModule, ProfilesModule],
  controllers: [
    BusinessFrontOfficeAgendaController,
    BusinessFrontOfficeAgendaDataController,
  ],
  providers: [],
})
export class BusinessFrontOfficeAgendaModule {}
