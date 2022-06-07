import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ReservationLegRepository,
  ReservationProfilesRepository,
  ReservationRepository,
} from './classes/reservation.repository';
import { doInsert } from '../../../common/db/utils/db.utils';
import {Pagination} from "../../../common/decorator";
import {ReservationDTO} from "./classes/reservation.dto";

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
    const reservation = await this.resHeadRepo
        .createQueryBuilder('res')
        .leftJoinAndSelect('res.legs', 'leg')
        .leftJoinAndSelect('res.profiles', 'profiles')
        .leftJoinAndSelect('profiles.profile', 'profile')
        .where(`res.companyId = :companyId and res.reservationId = :reservationId `,{
           companyId:companyId, reservationId:reservationId,
        }).getOne()

    if(reservation){
      return null
    }

    reservation.legs = await this.resLegRepo.find({
      where: {
        companyId: companyId,
        reservationId: reservationId,
      },
    });

    return reservation.exportForView();
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

    resHead.companyId = companyId
    resHead.initialiseData(reservation);
    await doInsert(resHead);
    return this.updateReservation(companyId,resHead.reservationId, reservation)
  }

  async updateReservation(companyId, reservationId, reservation: Partial<ReservationDTO.Update>) {
    const resHead = await this.resHeadRepo.findOne({
      where: { companyId: companyId, reservationId: reservationId },
    });
    // save Base Data
    resHead.initialiseData(reservation);

    // save Profiles
    if(reservation.profileIds) {
      await this.setProfilesToReservation(
          companyId, reservationId, reservation.profileIds
      )
    }


    await doInsert(resHead);
    return resHead.toJSON()
  }

  async setProfilesToReservation(companyId,reservationId,profilesIds){
    // add profiles to reshead
    if( profilesIds ){
      await this.resProfilesRepo.removeProfilesFromReservation(companyId,reservationId,profilesIds)
      return this.resProfilesRepo.addProfilesToReservation(
          companyId, reservationId, profilesIds
      );
    }
  }

  setReservationState(
      companyId: number,
    reservationId: number,
    state: number
  ) {}

  deleteReservation(companyId: number, reservationId: number) {}
}
