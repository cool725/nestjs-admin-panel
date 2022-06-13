import {
  BaseEntity, BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { FinAccountEntity } from './account.entity.app';
import {TenantCompanyEntity} from "../../../../company/src";

@Entity('fin_account_tax')
@Index(['companyId'])
@Index(['companyId', 'type'])
export class FinAccountTaxEntity extends TenantCompanyEntity {

  protected self = FinAccountTaxEntity;

  @PrimaryGeneratedColumn()
  @Exclude()
  id: string;

  @Column({ type: 'integer', nullable: false })
  companyId: number;

  @Column({ type: 'integer', nullable: false, unsigned: true })
  taxId: number;

  @Column({ type: 'integer', nullable: false, unsigned: true })
  externId: number;

  @OneToMany(() => FinAccountEntity, (acc) => acc.tax, {
    onDelete: 'CASCADE',
    eager: false,
  })
  accounts: FinAccountEntity[];

  @Column({ type: 'char', nullable: false, length: 5 })
  code: string;

  @Column({ type: 'char', nullable: false, length: 10 })
  type: number;

  @Column({
    type: 'float',
    nullable: false,
    precision: 5,
    scale: 2,
  })
  value: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'smallint', precision: 5, nullable: false })
  startYear: number;

  @Column({ type: 'smallint', precision: 5, nullable: true })
  endYear: number;

  @Column({ type: 'boolean', nullable: true, default: true })
  isActive: boolean;


  @BeforeInsert()
  protected beforeInsert(): Promise<any> {
    return this.setLastEntryId('taxId')
  }
}
