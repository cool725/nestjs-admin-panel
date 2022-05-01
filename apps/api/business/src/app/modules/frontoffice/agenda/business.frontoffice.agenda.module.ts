import { Module } from '@nestjs/common';
import { BusinessFrontOfficeAgendaController } from './business.frontoffice.agenda.controller';
import {ReservationModule} from "@movit/api/reservation";

@Module({
  imports: [ReservationModule],
  controllers: [BusinessFrontOfficeAgendaController],
  providers: [],
})
export class BusinessFrontOfficeAgendaModule {}
