import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppsEntity } from './start.entity.app';

@Entity('app_category')
@Index(['domain'])
@Index(['domain', 'companyId'])
export class AppsCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  categoryId: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  domain: string;

  @Column({ nullable: true })
  parentCategoryId?: number;

  /*
   * If companyId is num then its shared
   * */
  @Column({ type: 'int', nullable: true, unsigned: true })
  companyId: string;

  @OneToMany(() => AppsEntity, (app) => app.category, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn([
    { name: 'categoryId', referencedColumnName: 'categoryId' },
    { name: 'companyId', referencedColumnName: 'companyId' },
  ])
  apps: AppsEntity;

  @Column({ type: 'varchar', length: 20, nullable: true })
  title: string;

  constructor(params = {}) {
    super();
    this.initialise(params);
  }

  protected initialise(params: Partial<AppsCategoryEntity>) {
    if (params) Object.assign(this, params);
  }
}
