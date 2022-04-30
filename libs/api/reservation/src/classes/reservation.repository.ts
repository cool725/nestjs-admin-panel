import { EntityRepository, Repository } from 'typeorm';
import { ReservationHeadEntity } from "../entities/reservation-head.entity";

@EntityRepository(ReservationHeadEntity)
export class ReservationRepository extends Repository<ReservationHeadEntity> {
  constructor() {
    super();
  }


}
