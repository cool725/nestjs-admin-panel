import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Generated,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('crm_profile')
@Index(['companyId'])
@Unique(['companyId', 'profileId'])
export class ProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  profileId: number;

  @Column({ type: 'varchar', length: 50, nullable:true })
  firstName: string;

  @Column({ type: 'varchar', length: 70, nullable:true })
  lastName: string;

  @Column({ type: 'varchar', length: 100, nullable:true })
  email: string;

  @Column({ type: 'varchar', length: 15, nullable:true })
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
