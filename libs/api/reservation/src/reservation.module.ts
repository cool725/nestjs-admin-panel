import { Module } from '@nestjs/common';
import {ReservationService} from "./reservation.service";
import ReservationDBOptions from "./db/reservation.database";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReservationHeadEntity } from "./entities/reservation-head.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ReservationHeadEntity])],

  providers: [ReservationService],
  exports: [ReservationService],
})
export class ReservationModule {
  static dbSettings = ReservationDBOptions
}
