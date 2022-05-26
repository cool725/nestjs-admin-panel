import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ReservationLegRepository,
  ReservationProfilesRepository,
  ReservationRepository,
} from './classes/reservation.repository';
import { doInsert } from '../../../common/db/utils/db.utils';
import {Pagination} from "../../../common/decorator";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationRepository)
    private resHeadRepo: ReservationRepository,
    @InjectRepository(ReservationLegRepository)
    private resLegRepo: ReservationLegRepository,
    @InjectRepository(ReservationProfilesRepository)
    private resProfilesRepo: ReservationProfilesRepository
  ) {}

  async getReservation(companyId, reservationId) {
    const reservation = await this.resHeadRepo.findOne({
      where: {
        companyId: companyId,
        reservationId,
      },
    });
    reservation.legs = await this.resLegRepo.find({
      where: {
        companyId: companyId,
        reservationId: reservationId,
      },
    });
    return reservation;
  }

  async getReservationsPaginated(companyId, paginate:Pagination) {
    return paginate.apply(this.resHeadRepo,companyId)
  }


  async getReservations(companyId, filterValues = {}) {
    const rows = await this.resHeadRepo.find({
      where: {
        companyId: companyId,
      },
    });
    return {
      data: rows,
    };
  }

  async saveReservation(companyId, reservation) {
    const resHead = this.resHeadRepo.create();
    resHead.companyId = companyId;
    resHead.start = reservation.start;
    resHead.end = reservation.end;
    resHead.title = reservation.title;
    resHead.userId = reservation.userId;
    await doInsert(resHead);
    return resHead.toJSON();
  }

  async updateReservation(companyId, reservationId, reservation: any) {
    const resHead = await this.resHeadRepo.findOne({
      where: { companyId: companyId, reservationId: reservationId },
    });
  }

  setReservationState(
      companyId: number,
    reservationId: number,
    state: number
  ) {}

  deleteReservation(companyId: number, reservationId: number) {}
}
