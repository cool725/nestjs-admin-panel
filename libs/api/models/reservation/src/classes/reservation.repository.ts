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

  linkProfile(companyId: number, reservationId: number, profileId: number) {
    const link = this.create();
    link.companyId = companyId;
    link.reservationId = reservationId;
    link.profileId = profileId;
    return link.save();
  }

  async linkProfiles(
    companyId: number,
    reservationId: number,
    profileIds: number[]
  ) {
    for (let i = 0; i < profileIds.length; i++) {
      await this.linkProfile(companyId, reservationId, profileIds[i]);
    }
  }

  unlinkProfiles(companyId: number, reservationId: number, profileId: number) {
    this.delete({
      companyId: companyId,
      reservationId: reservationId,
      profileId: profileId,
    });
  }

  updateSmsState() {}
  updateEmailState() {}
}
