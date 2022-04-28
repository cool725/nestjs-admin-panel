import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import {ProfileSegmentEntity} from "./profile.segment.entity";

@Entity('crm_profile')
@Index(['companyId'])
@Unique(['companyId', 'profileId'])
@Index(['companyId', 'vip'])
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  profileId: number;

  @Column({ enum: ['C','M','W'],  nullable:false })
  gender: string;

  @Column({ type: 'varchar', length: 50, nullable:true })
  firstName: string;

  @Column({ type: 'varchar', length: 70, nullable:true })
  lastName: string;

  @Column({ type: 'varchar', length: 100, nullable:true })
  email: string;

  @Column({ type: 'varchar', length: 15, nullable:true })
  phone: string;

  @Column({ type: 'date',  nullable:true })
  birthDay: number;

  @Column({ type: 'smallint',  nullable:true })
  vip: number | string;

  @ManyToOne(() => ProfileSegmentEntity, (segment) => segment.profiles)
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'segmentId', referencedColumnName: 'segmentId' },
  ])
  segmentId:ProfileSegmentEntity;

  @Column({ type: 'smallint', nullable:true,unsigned:true })
  languageId: number;

  @Column({ type: 'int', nullable:true, unsigned:true })
  priceClassId: number;

  @Column({ type: 'int',  nullable:true, unsigned:true })
  sourceId: number;

  @Column({ type: 'text', nullable:true })
  @Exclude()
  notes: string;

  constructor() {
    super();
  }

  @BeforeInsert()
  protected async beforeInsert() {
    this.profileId =
      (await ProfileEntity.count({
        where: { companyId: this.companyId },
      })) + 1;
  }

  protected toJSON() {
    return this;
  }
}
