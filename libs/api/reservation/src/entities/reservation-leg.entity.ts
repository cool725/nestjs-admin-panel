import {BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique} from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';
import { ReservationHeadEntity } from './reservation-head.entity';

@Entity('res_reservation_leg')
@Index(['companyId'])
@Index(['companyId','userId'])
@Unique(['companyId','reservationId','legId'])
export class ReservationLegEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  reservationId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  legId: number;

  @ManyToOne(() => ReservationHeadEntity, (res) => res.legs, )
  head: ReservationHeadEntity;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  userId: number;

  @Column({ type: 'datetime', nullable: false })
  start: Date;

  @Column({ type: 'datetime', nullable: true })
  end: Date;

  public toJSON() {
    return instanceToPlain(this);
  }
}
