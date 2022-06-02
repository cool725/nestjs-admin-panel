import { EntityRepository, Repository } from 'typeorm';
import { ReservationHeadEntity } from '../entities/reservation-head.entity';
import { ReservationLegEntity } from '../entities/reservation-leg.entity';
import { ReservationProfilesEntity } from '../entities/reservation.profiles.entity';

@EntityRepository(ReservationHeadEntity)
export class ReservationRepository extends Repository<ReservationHeadEntity> {
  constructor() {
    super();
  }

}

@EntityRepository(ReservationLegEntity)
export class ReservationLegRepository extends Repository<ReservationLegEntity> {
  constructor() {
    super();
  }
}

@EntityRepository(ReservationProfilesEntity)
export class ReservationProfilesRepository extends Repository<ReservationProfilesEntity> {
  constructor() {
    super();
  }

  addProfileToReservation(companyId: number, reservationId: number, profileId: number) {
    const link = this.create();
    link.companyId = companyId;
    link.reservationId = reservationId;
    link.profileId = profileId;
    return link.save();
  }

  async addProfilesToReservation(
    companyId: number,
    reservationId: number,
    profileIds: number[]
  ) {
    for (let i = 0; i < profileIds.length; i++) {
      await this.addProfileToReservation(companyId, reservationId, profileIds[i]);
    }
  }

  async removeProfilesFromReservation(companyId: number, reservationId: number, profileIds: number[]) {
    for(let i = 0; i<profileIds?.length;i++){
      await this.removeProfileFromReservation(companyId,reservationId,
          profileIds[i])
    }
  }

  removeProfileFromReservation(companyId: number, reservationId: number, profileId: number) {
    return this.delete({
      companyId: companyId,
      reservationId: reservationId,
      profileId: profileId,
    });
  }

  updateSmsState() {}

  updateEmailState() {}
}
