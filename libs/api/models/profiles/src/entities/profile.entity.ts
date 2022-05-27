import {
  BaseEntity,
  BeforeInsert,
  Column,
  DeleteDateColumn,
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
import { ProfileSegmentEntity } from './profile.segment.entity';
import { ProfileSourceEntity } from './profile.source.entity';
import { ProfileSegmentRelationEntity } from './profile.segment.relation.entity';
import { ProfilePriceClassEntity } from './profile.priceclass.entity';
import { TenantCompanyEntity } from '../../../company/src/tentant/company.tentant';

@Entity('crm_profile')
@Index(['companyId'])
@Unique(['companyId', 'profileId'])
@Index(['companyId', 'vip'])
export class ProfileEntity extends TenantCompanyEntity {
  @Exclude() self = ProfileEntity;

  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  profileId: number;

  @Column({ type: 'enum', enum: ['C', 'M', 'W'], nullable: false })
  gender: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  birthDay: Date;

  @Column({ type: 'smallint', nullable: true })
  vip: number | string;

  @Column({ type: 'smallint', nullable: true, unsigned: true })
  languageId: number;

  @Column({ type: 'bigint', nullable: true, unsigned: true })
  sourceId: number;

  @Column({ type: 'bigint', nullable: true, unsigned: true })
  priceClassId: number;

  @ManyToMany(() => ProfileSegmentRelationEntity, (segment) => segment.profile)
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'profileId', referencedColumnName: 'profileId' },
  ])
  segments: ProfileSegmentRelationEntity[] | number[];

  @ManyToOne(() => ProfileSourceEntity, (source) => source.profiles)
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'sourceId', referencedColumnName: 'sourceId' },
  ])
  source: ProfileSourceEntity;

  @ManyToOne(() => ProfilePriceClassEntity, (priceClass) => priceClass.profiles)
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'priceClassId', referencedColumnName: 'priceClassId' },
  ])
  priceClass: ProfilePriceClassEntity;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  public initialiseData(profile: Partial<ProfileEntity>) {
    this.firstName = profile.firstName;
    this.lastName = profile.lastName;
    this.email = profile.email;
    this.phone = profile.phone;

    this.birthDay = profile.birthDay || null;

    this.sourceId = profile.sourceId || null;
    this.priceClassId = profile.priceClassId || null;
    this.languageId = profile.languageId || null;
    this.vip        = profile.vip || null;

    this.notes = profile.notes;
    return this;
  }

  @BeforeInsert()
  protected async beforeInsert() {
    await this.setLastEntryId('profileId');
  }
}
