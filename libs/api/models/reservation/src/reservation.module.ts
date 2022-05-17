import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import ReservationDBOptions from './db/reservation.database';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ReservationLegRepository,
  ReservationProfilesRepository,
  ReservationRepository,
} from './classes/reservation.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservationRepository,
      ReservationLegRepository,
      ReservationProfilesRepository,
    ]),
  ],

  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {
  static dbSettings = ReservationDBOptions;
}
