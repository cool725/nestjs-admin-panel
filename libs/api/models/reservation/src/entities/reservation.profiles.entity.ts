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
import { TenantEntity } from '../../../../common/db/db.CoreEntity';

@Entity('res_profiles')
@Index(['companyId'])
@Unique(['companyId', 'profileId', 'reservationId'])
export class ReservationProfilesEntity extends TenantEntity {
  @Exclude() self = ReservationProfilesEntity;
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  profileId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  reservationId: number;

  @Column({ type: 'char', nullable: false, default:0 })
  remindSMSState: number;

  @Column({ type: 'char', nullable: false, default:0 })
  remindEmailState: number;

  constructor() {
    super();
  }

  @BeforeInsert()
  protected async beforeInsert() {

  }

  public toJSON() {
    return this;
  }
}
