import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index, JoinColumn, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { TenantCompanyEntity } from '../../../company/src/tentant/company.tentant';
import {ReservationHeadEntity} from "./reservation-head.entity";
import {ProfileEntity} from "../../../profiles/src/entities/profile.entity";

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

  @ManyToOne(() => ReservationHeadEntity, (res) => res.profiles,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
  })
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'reservationId', referencedColumnName: 'reservationId' },
  ])
  head: ReservationHeadEntity;

  @ManyToOne(() => ProfileEntity, (res) => res.resReminders)
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'profileId', referencedColumnName: 'profileId' },
  ])
  profile: ProfileEntity;

  constructor() {
    super();
  }

  @BeforeInsert()
  protected async beforeInsert() {}

  public toJSON() {
    return this;
  }
}
