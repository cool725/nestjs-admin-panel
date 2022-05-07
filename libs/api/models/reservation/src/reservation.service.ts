import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ReservationLegRepository,
  ReservationRepository,
} from './classes/reservation.repository';
import { doInsert } from "../../../common/db/utils/db.utils";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationRepository)
    private resHeadRepo: ReservationRepository,
    @InjectRepository(ReservationLegRepository)
    private resLegRepo: ReservationLegRepository
  ) {}

  async getReservation(businessId, reservationId) {
    const reservation = await this.resHeadRepo.findOne({
      where: {
        companyId: businessId,
        reservationId,
      },
    });
    reservation.legs = await this.resLegRepo.find({
      where: {
        companyId: businessId,
        reservationId: reservationId,
      },
    });
    return reservation;
  }

  getReservations(businessId, filterValues = {}) {
    return this.resHeadRepo.find({
      where: {
        companyId: businessId,
      },
    });
  }

  async saveReservation(businessId, reservation) {
    const resHead = this.resHeadRepo.create();
    resHead.companyId = businessId;
    resHead.start = reservation.start;
    resHead.title = reservation.title;
    resHead.userId = reservation.userId;
    resHead.reservationId = 1;
    await doInsert(resHead);
    return
  }

  async updateReservation(businessId, reservationId, reservation: any) {
    const resHead = await this.resHeadRepo.findOne({
      where: { businessId: businessId, reservationId: reservationId },
    });
  }

  setReservationState(
    businessId: number,
    reservationId: number,
    state: number
  ) {}

  deleteReservation(businessId: number, reservationId: number) {}
}