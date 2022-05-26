import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppsEntity } from './start.entity.app';
import { AppsRoleEntity } from './start.entity.role.app';

@Entity('app_user_rights')
@Index(['companyId'])
export class AppsUserRightEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'int', nullable: false, unsigned: true })
  companyId: number;

  @ManyToOne(() => AppsRoleEntity, (user) => user.users, {
    eager: false,
    cascade: true,
  })
  @JoinColumn({ name: 'roleId', referencedColumnName: 'roleId' })
  role: AppsRoleEntity;

  constructor(params: Partial<AppsEntity> = {}) {
    super();
    this.initialise(params);
  }
  protected initialise(params: Partial<AppsEntity>) {
    if (params) Object.assign(this, params);
  }
}
