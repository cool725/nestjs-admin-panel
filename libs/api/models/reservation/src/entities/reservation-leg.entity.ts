import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ReservationHeadEntity } from './reservation-head.entity';
import { TenantCompanyEntity } from '../../../company/src/tentant/company.tentant';

@Entity('res_reservation_leg')
@Index(['companyId'])
@Index(['companyId', 'userId'])
@Unique(['companyId', 'reservationId', 'legId'])
export class ReservationLegEntity extends TenantCompanyEntity {
  @Exclude() self = ReservationLegEntity;

  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  reservationId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  legId: number;

  @ManyToOne(() => ReservationHeadEntity, (res) => res.legs)
  head: ReservationHeadEntity;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  userId: number;

  @Column({ type: 'datetime', nullable: false })
  start: Date;

  @Column({ type: 'datetime', nullable: true })
  end: Date;

  @BeforeInsert()
  protected async beforeInsert() {
    // no needs to call setLastEntryId
  }
}
