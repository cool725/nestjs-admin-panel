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

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;


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

  toJSON() {
    return this;
  }
}
