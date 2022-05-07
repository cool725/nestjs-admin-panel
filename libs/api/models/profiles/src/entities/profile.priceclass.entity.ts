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

@Entity('crm_priceclass')
@Index(['companyId'])
@Index(['companyId', 'deletedAt'])
@Unique(['companyId', 'priceClassId'])
export class ProfilePriceClassEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  priceClassId: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title: string;

  @Column({ type: 'smallint', nullable: true, default: 1 })
  order: number;

  @Column({ type: 'date', nullable: true })
  deletedAt: Date;

  @OneToMany(() => ProfileEntity, (profile) => profile.priceClassId, {})
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'priceClassId', referencedColumnName: 'priceClassId' },
  ])
  profiles: ProfilePriceClassEntity[];

  constructor() {
    super();
  }

  @BeforeInsert()
  protected async beforeInsert() {
    const priceClass = await ProfilePriceClassEntity.find({
      where: { companyId: this.companyId },
      take: 1,
      order: {
        priceClassId: 'DESC',
      },
    });

    this.priceClassId =
      1 + (priceClass && priceClass[0] ? priceClass[0].priceClassId : 0);
  }

  toJSON() {
    return this;
  }
}