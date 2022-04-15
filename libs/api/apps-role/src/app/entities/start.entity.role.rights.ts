import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('app_role_rights')
@Index(['companyId'])
@Unique(['companyId', 'roleId', 'appId'])
export class AppsRoleRightsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: true, unsigned: true })
  companyId: number;

  @Column({ type: 'int', precision: 20, nullable: true, unsigned: true })
  roleId: number;

  @Column({ type: 'int', precision: 20, nullable: true, unsigned: true })
  appId: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  access: string;

  constructor(params: Partial<AppsRoleRightsEntity> = {}) {
    super();
    this.initialise(params);
  }
  protected initialise(params: Partial<AppsRoleRightsEntity>) {
    if (params) Object.assign(this, params);
  }
}
