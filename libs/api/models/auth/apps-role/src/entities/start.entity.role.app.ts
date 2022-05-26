import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppsEntity } from './start.entity.app';
import { AppsUserRightEntity } from './start.entity.user.rights';

@Entity('app_role')
@Index(['companyId'])
@Index(['domain'])
export class AppsRoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  roleId: number;

  @Column({ type: 'int', nullable: true, unsigned: true })
  companyId: number;

  @Column({
    default: 'domain',
    type: 'enum',
    nullable: true,
    enum: ['domain', 'group', 'global'],
  })
  type: 'domain' | 'group' | 'global';

  @Column({ type: 'varchar', length: 10, nullable: true })
  domain: string;

  @OneToMany(() => AppsEntity, (apps) => apps.roles, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: 'app_role_rights',
    joinColumns: [
      {
        name: 'roleId',
        referencedColumnName: 'roleId',
      },
    ],
    inverseJoinColumns: [
      {
        name: 'appId',
        referencedColumnName: 'appId',
      },
    ],
  })
  apps: AppsEntity[];

  @OneToMany(() => AppsUserRightEntity, (user) => user.role, {
    eager: false,
  })
  users: AppsUserRightEntity[];

  @Column({ type: 'varchar', length: 20, nullable: true })
  title?: string;

  @Column({ type: 'boolean', nullable: true, default: true })
  state: boolean;

  constructor(params: Partial<AppsRoleEntity> = {}) {
    super();
    this.initialise(params);
  }
  protected initialise(params: Partial<AppsRoleEntity>) {
    if (params) Object.assign(this, params);
  }
}
