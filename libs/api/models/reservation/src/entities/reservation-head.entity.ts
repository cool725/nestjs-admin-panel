import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';

import { ReservationLegEntity } from './reservation-leg.entity';
import { ReservationSourceEntity } from './reservation.source.entity';
import { TenantCompanyEntity } from '../../../company/src/tentant/company.tentant';

@Entity('res_reservation_head')
@Index(['userId'])
@Index(['companyId'])
@Index(['companyId', 'state'])
@Unique(['companyId', 'reservationId'])
export class ReservationHeadEntity extends TenantCompanyEntity {
  @Exclude() self = ReservationHeadEntity;

  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  reservationId: number;

  @OneToMany(() => ReservationLegEntity, (leg) => leg.head, { eager: false })
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'reservationId', referencedColumnName: 'reservationId' },
  ])
  legs: ReservationLegEntity[];

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  userId: number;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  title: string;

  @Column({ type: 'varchar', nullable: true, length: 120 })
  place: string;

  @Column({ type: 'varchar', nullable: true, length: 9 })
  color: string;

  @Column({ type: 'tinyint', nullable: false, default: 0 })
  state: number;

  // First Entry
  @Column({ type: 'datetime', nullable: false })
  start: Date;

  // Last Entry
  @Column({ type: 'datetime', nullable: true })
  end: Date;

  @ManyToOne(() => ReservationSourceEntity, (source) => source.reservations)
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'sourceId', referencedColumnName: 'sourceId' },
  ])
  sourceId: number;

  // guests
  profiles: any[];

  @BeforeInsert()
  protected async beforeInsert() {
    await this.setLastEntryId('reservationId');
  }
}
