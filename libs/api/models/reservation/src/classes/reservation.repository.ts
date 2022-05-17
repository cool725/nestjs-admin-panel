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

  linkProfile(businessId: number, reservationId: number, profileId: number) {
    const link = this.create();
    link.companyId = businessId;
    link.reservationId = reservationId;
    link.profileId = profileId;
    return link.save();
  }

  async linkProfiles(
    businessId: number,
    reservationId: number,
    profileIds: number[]
  ) {
    for (let i = 0; i < profileIds.length; i++) {
      await this.linkProfile(businessId, reservationId, profileIds[i]);
    }
  }

  unlinkProfiles(businessId: number, reservationId: number, profileId: number) {
    this.delete({
      companyId: businessId,
      reservationId: reservationId,
      profileId: profileId,
    });
  }

  updateSmsState() {}
  updateEmailState() {}
}
