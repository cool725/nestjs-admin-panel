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
import { TenantCompanyEntity } from '../../../company/src/tentant/company.tentant';

@Entity('res_profiles')
@Index(['companyId'])
@Unique(['companyId', 'profileId', 'reservationId'])
export class ReservationProfilesEntity extends TenantCompanyEntity {
  @Exclude() self = ReservationProfilesEntity;
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  profileId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  reservationId: number;

  @Column({ type: 'char', nullable: false, default: 0 })
  remindSMSState: number;

  @Column({ type: 'char', nullable: false, default: 0 })
  remindEmailState: number;

  constructor() {
    super();
  }

  @BeforeInsert()
  protected async beforeInsert() {}

  public toJSON() {
    return this;
  }
}
