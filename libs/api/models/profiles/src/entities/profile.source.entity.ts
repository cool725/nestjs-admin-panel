import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProfileEntity } from './profile.entity';

@Entity('crm_source')
@Index(['companyId'])
@Unique(['companyId', 'sourceId'])
export class ProfileSourceEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  sourceId: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  color: string;

  @Column({ type: 'smallint', nullable: true, default: 1 })
  order: number;

  @OneToMany(() => ProfileEntity, (profile) => profile.source, {})
  profiles: ProfileEntity[];

  constructor() {
    super();
  }

  @BeforeInsert()
  protected async beforeInsert() {
    this.sourceId =
      (await ProfileSourceEntity.count({
        where: { companyId: this.companyId },
      })) + 1;
  }

  public toJSON() {
    return this;
  }
}
