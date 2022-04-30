import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ReservationRepository} from "./classes/reservation.repository";

@Injectable()
export class ReservationService {
  constructor(
      @InjectRepository(ReservationRepository)
      private resRepo: ReservationRepository
  ) {
  }
}

