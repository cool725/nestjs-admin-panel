import { EntityRepository, Repository } from 'typeorm';
import { ReservationHeadEntity } from "../entities/reservation-head.entity";
import {ReservationLegEntity} from "../entities/reservation-leg.entity";

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
