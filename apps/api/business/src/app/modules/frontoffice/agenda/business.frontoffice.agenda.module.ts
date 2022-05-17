import { Module } from '@nestjs/common';
import { BusinessFrontOfficeAgendaController } from './business.frontoffice.agenda-reservation.controller';
import { ReservationModule } from '@movit/api/reservation';
import { BusinessFrontOfficeAgendaProfilesController } from './business.frontoffice.agenda-profiles.controller';
import { ProfilesModule } from '@movit/api/profiles';

@Module({
  imports: [ReservationModule, ProfilesModule],
  controllers: [
    BusinessFrontOfficeAgendaController,
    BusinessFrontOfficeAgendaProfilesController,
  ],
  providers: [],
})
export class BusinessFrontOfficeAgendaModule {}
