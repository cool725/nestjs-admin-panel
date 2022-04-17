import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';


@Entity('crm_profile')
@Index(['companyId'])
@Unique(['companyId','profileId'])
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned:true })
  companyId: string;

  @Column({ type: 'bigint', nullable: false, unsigned:true })
  profileId: string;


  constructor() {
    super();

  }

  @BeforeInsert()
  private beforeInsert() {

  }


  toJSON() {
    return this;
  }
}
