import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index, JoinColumn, ManyToMany, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
 import {ProfileEntity} from "./profile.entity";
import {ProfileSegmentRelationEntity} from "./profile.segment.relation.entity";

@Entity('crm_segment')
@Index(['companyId'])
@Unique(['companyId', 'segmentId'])
export class ProfileSegmentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  segmentId: number;

  @Column({ type: 'varchar', length: 50, nullable:true })
  title: string;

  @Column({ type: 'varchar', length: 10, nullable:true })
  color: string;

  @Column({ type: 'smallint',  nullable:true, default:1 })
  order: number;

  @OneToMany(() => ProfileSegmentRelationEntity, (profile) => profile.segment, {})
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'segmentId', referencedColumnName: 'segmentId' },
  ])
  profiles:ProfileSegmentRelationEntity[];

  constructor() {
    super();
  }

  @BeforeInsert()
  protected async beforeInsert() {
    console.warn('replace count with max')
    this.segmentId =
      (await ProfileSegmentEntity.count({
        where: { companyId: this.companyId },
      })) + 1;
  }



  toJSON() {
    return this;
  }
}