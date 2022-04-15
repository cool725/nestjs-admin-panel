import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, instanceToPlain } from 'class-transformer';

@Entity('auth_user_invited')
@Unique(['email', 'businessId'])
export class AuthUserInvited extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  invitationId: string;

  @Column({ type: 'varchar', unique: false, length: 100 })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  @Exclude()
  businessId: string | number | null;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'char', unique: false, length: 1 })
  state: string;

  public toJSON() {
    return instanceToPlain(this);
  }
}
