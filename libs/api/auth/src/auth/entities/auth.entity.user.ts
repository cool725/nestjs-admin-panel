import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { AuthLogin } from './auth.entity.login';
import { Exclude, instanceToPlain } from 'class-transformer';

@Entity('auth_user')
export class AuthUser extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 50, type: 'varchar' })
  @Index()
  @Exclude()
  host: string;

  @Column({ length: 150, type: 'varchar' })
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column({ type: 'smallint', precision: 5 })
  @Index()
  @Exclude()
  authCreatedAt: number;

  @Column({ type: 'date', nullable: true })
  @Exclude()
  deleted: boolean;

  @OneToMany(() => AuthLogin, (login) => login.user, { eager: false })
  @Exclude()
  logins: AuthLogin[];

  @Column({ type: 'varchar', nullable: true })
  @Exclude()
  passwordResetLink: string | null;

  @Column({ type: 'varchar', length: 150, nullable: true })
  avatar?: string;

  @Column({ type: 'char', length: 1, nullable: true })
  gender?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone?: string;

  @Column({ type: 'date', nullable: true })
  birthDay?: string;

  @BeforeInsert()
  private async beforeInsert() {
    await this.setSalt(await bcrypt.genSalt())
      .setAuthCreatedAt()
      .setPassword(await bcrypt.hash(this.password || '****', this.salt));
  }

  public async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  public setAuthCreatedAt(year: number = new Date().getFullYear()): this {
    this.authCreatedAt = year;
    return this;
  }

  public setEmail(value: string): this {
    this.email = value;
    this.host = value.split('@')[1];
    return this;
  }

  public setSalt(value: string): this {
    this.salt = value;
    return this;
  }

  public setPassword(value: string): this {
    this.password = value;
    return this;
  }

  public async setPasswordAndEncrypt(value: string) {
    this.password = await bcrypt.hash(value || '****', this.salt);
    return this;
  }

  public toJSON() {
    return instanceToPlain(this);
  }

  initialise(data: Partial<AuthUser>, secure = false) {
    if (!secure) {
      delete data.password;
      Object.assign(this, data);
    }
    return this;
  }
}
