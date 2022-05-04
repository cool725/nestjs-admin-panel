import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProfileEntity } from './profile.entity';
import { ProfileSegmentEntity } from './profile.segment.entity';

@Entity('crm_profile_segment')
@Index(['companyId'])
@Unique(['companyId', 'profileId', 'segmentId'])
export class ProfileSegmentRelationEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  segmentId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  profileId: number;

  @OneToMany(() => ProfileEntity, (profile) => profile.segments, {})
  profile: ProfileEntity;

  @OneToMany(() => ProfileSegmentEntity, (segment) => segment.profiles, {})
  segment: ProfileSegmentEntity;

  constructor() {
    super();
  }

  toJSON() {
    return this;
  }
}
