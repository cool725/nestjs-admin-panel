import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ReservationHeadEntity } from './reservation-head.entity';

@Entity('res_source')
@Index(['companyId'])
@Unique(['companyId', 'sourceId'])
export class ReservationSourceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  sourceId: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  color: string;

  @Column({ type: 'smallint', nullable: true, default: 1 })
  order: number;

  @OneToMany(
    () => ReservationHeadEntity,
    (reservation) => reservation.sourceId,
    {}
  )
  reservations: ReservationHeadEntity[];

  constructor() {
    super();
  }

  @BeforeInsert()
  protected async beforeInsert() {}

  public toJSON() {
    return this;
  }
}
