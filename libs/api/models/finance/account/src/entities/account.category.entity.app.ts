import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { FinAccountEntity } from './account.entity.app';

@Entity('fin_account_category')
@Index(['companyId'])
@Unique(['companyId', 'code'])
export class FinAccountCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ type: 'integer', nullable: false })
  companyId: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'smallint', nullable: false, precision: 5 })
  code: number;

  @Column({ type: 'varchar', nullable: false, length: 10 })
  externId: number;

  @Column({ type: 'boolean', nullable: true, default: true })
  isActive: boolean;

  @ManyToOne(() => FinAccountCategoryEntity, (cat) => cat.categories, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({
    name: 'parentAccountCategoryId',
  })
  categories: FinAccountCategoryEntity[];

  @OneToMany(() => FinAccountEntity, (acc) => acc.category, {
    onDelete: 'CASCADE',
    eager: false,
  })
  accounts: FinAccountEntity[];
}
