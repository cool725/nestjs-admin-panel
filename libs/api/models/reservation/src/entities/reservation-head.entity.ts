import {
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
import {classToPlain, Exclude} from 'class-transformer';

import { ReservationLegEntity } from './reservation-leg.entity';
import { ReservationSourceEntity } from './reservation.source.entity';
import { TenantCompanyEntity } from "@movit/api/business";
import {ReservationProfilesEntity} from "./reservation.profiles.entity";

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
  legs: ReservationLegEntity[];

  @Column({ type: 'varchar', nullable: false })
  userId: string;

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
  @OneToMany(()=> ReservationProfilesEntity,(rpe)=> rpe.head)
  profiles: ReservationProfilesEntity[];


  @BeforeInsert()
  protected async beforeInsert() {
    await this.setLastEntryId('reservationId');
  }

  initialiseData(reservation:any) {
    this.start = reservation.start;
    this.end = reservation.end;
    this.title = reservation.title;
    this.userId = reservation.userId;
  }

  public exportForView() {
    const data = classToPlain(this);
    if( data.profiles ){
      let profiles = []
      data.reminders = data.profiles.map( reminder => {
        if( reminder?.profile){
          profiles.push({
            companyId: reminder?.profile?.companyId,
            profileId: reminder?.profile?.profileId,
            firstName: reminder?.profile?.firstName,
            lastName: reminder?.profile?.lastName,
          });
        }
        reminder.profile = undefined
        return reminder
      });
      data.profiles = profiles;
      data.profileIds = profiles.map(v => v.profileId);
    }
    return data
  }
}
