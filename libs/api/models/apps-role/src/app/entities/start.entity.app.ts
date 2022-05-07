import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppsCategoryEntity } from './start.entity.category';
import { AppsRoleEntity } from './start.entity.role.app';

@Entity('app_app')
@Index(['domain', 'companyId'])
export class AppsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  appId: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  @Index('app_domain')
  domain: string;

  @Column({ type: 'int', nullable: true })
  @Index('app_companyId')
  companyId: number;

  @ManyToOne(() => AppsCategoryEntity, (cat) => cat.apps, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn([{ name: 'categoryId', referencedColumnName: 'categoryId' }])
  category: AppsCategoryEntity;

  @Column({ type: 'varchar', length: 20, nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  path: string;

  @Column({ type: 'varchar', nullable: false, default: '' })
  img: string;

  @ManyToMany(() => AppsRoleEntity, (role) => role.apps)
  roles: AppsRoleEntity[];

  constructor(params: Partial<AppsEntity> = {}) {
    super();
    this.initialise(params);
  }

  protected initialise(params: Partial<AppsEntity>) {
    if (params) Object.assign(this, params);
  }
}
