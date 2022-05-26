import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProfileEntity } from './profile.entity';
import { ProfileSegmentRelationEntity } from './profile.segment.relation.entity';
import { TenantCompanyEntity } from '../../../company/src/tentant/company.tentant';

@Entity('crm_segment')
@Index(['companyId'])
@Unique(['companyId', 'segmentId'])
export class ProfileSegmentEntity extends TenantCompanyEntity {
  @Exclude() self = ProfileSegmentEntity;

  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  segmentId: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  color: string;

  @Column({ type: 'smallint', nullable: true, default: 1 })
  order: number;

  @OneToMany(
    () => ProfileSegmentRelationEntity,
    (profile) => profile.segment,
    {}
  )
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'segmentId', referencedColumnName: 'segmentId' },
  ])
  profiles: ProfileSegmentRelationEntity[];

  @BeforeInsert()
  protected async beforeInsert() {
    await this.setLastEntryId('segmentId');
  }
}
