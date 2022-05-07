import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('auth_template')
@Index(['companyId'])
@Unique(['companyId', 'name'])
export class AuthTemplate extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', nullable: true })
  companyId: number;

  @Column({ type: 'char', length: 3, nullable: false, default: 'DE' })
  lang: string;

  @Column({ type: 'char', length: 15, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 89, nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  template: string;

  @Column({ type: 'text', nullable: true })
  settings: string;

  public initialise(params: Partial<AuthTemplate>) {
    if (params) Object.assign(this, params);
    return this;
  }
}
