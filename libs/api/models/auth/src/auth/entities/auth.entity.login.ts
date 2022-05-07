import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AuthUser } from './auth.entity.user';

@Entity('auth_login')
@Unique(['uuId', 'user'])
export class AuthLogin extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'smallint', precision: 5 })
  @Index()
  authCreatedAt: number;

  @Column({ type: 'varchar' })
  uuId: string;

  @ManyToOne(() => AuthUser, (user) => user.logins, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user: AuthUser;

  @Column({ type: 'varchar', length: 20, nullable: true })
  info: string;

  @Column({ type: 'bigint', nullable: true })
  @Index()
  companyId: number;

  @Column({
    type: 'timestamp',
    precision: 1,
    default: () => 'CURRENT_TIMESTAMP(1)',
    onUpdate: 'CURRENT_TIMESTAMP(1)',
  })
  updatedAt: Date;

  @Column({
    type: 'timestamp',
    precision: 1,
    nullable: true,
  })
  expiresAt: Date;

  constructor(params: Partial<AuthLogin> = {}) {
    super();
    this.initialise(params);
  }

  protected initialise(params: Partial<AuthLogin>) {
    if (params) Object.assign(this, params);
  }

  public setUser(user: AuthUser): this {
    this.user = user;
    return this;
  }

  public toJSON() {
    return this.user.toJSON();
  }
}
