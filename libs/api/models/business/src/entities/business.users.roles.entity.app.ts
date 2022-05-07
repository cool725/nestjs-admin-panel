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
import { Exclude } from 'class-transformer';
import { BusinessEntity } from './business.entity';
import { AuthUser } from '@movit/api/auth';

@Entity('com_user_roles')
export class BusinessUserRolesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Exclude()
  _id: number;

  @Column({ type: 'varchar', nullable: true, default: '', length: 20 })
  roles: string;

  @ManyToOne(() => BusinessEntity, (business) => business.roles, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'businessId' })
  business: BusinessEntity;

  @ManyToOne(() => AuthUser, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: AuthUser;

  @Column({ type: 'smallint', precision: 5, nullable: false })
  @Index()
  userCreatedAt: number;
}
