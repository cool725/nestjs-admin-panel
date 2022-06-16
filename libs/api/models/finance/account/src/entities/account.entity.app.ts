import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import { FinAccountCategoryEntity } from './account.category.entity.app';
import { FinAccountTaxEntity } from './account.tax.entity.app';
import { EAccountType } from '../classes/account.enum';
import { TenantCompanyEntity } from '../../../../company/src';

@Entity('fin_account')
@Unique(['companyId', 'code'])
@Unique(['companyId', 'accountId'])
@Index(['companyId', 'type'])
export class FinAccountEntity extends TenantCompanyEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: string;

  @Column({ type: 'tinyint', precision: 5, nullable: false, unsigned: true })
  accountId: number;

  @Column({ type: 'integer', nullable: false })
  companyId: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 25 })
  @Exclude()
  externId: string;

  @Column({ type: 'varchar', nullable: true, length: 10 })
  color: string;

  @Column({ type: 'tinyint', nullable: false })
  type: EAccountType;

  @Column({ type: 'smallint', nullable: false, precision: 5 })
  code: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  isActive: string;

  @ManyToOne(() => FinAccountCategoryEntity, (cat) => cat.accounts, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'accountCategoryId' })
  category: FinAccountCategoryEntity;

  @ManyToOne(() => FinAccountTaxEntity, (tax) => tax.accounts, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'taxId' })
  tax: FinAccountTaxEntity;

  @Column({ type: 'boolean', default: false })
  showInCashSystem: boolean;

  constructor(params: Partial<FinAccountEntity> = {}) {
    super();
    this.initialise(params);
  }

  protected initialise(params: Partial<FinAccountEntity>) {
    if (params) Object.assign(this, params);
  }

  static async getHighestAccountId(companyId: number) {
    const row = await FinAccountEntity.findOne({
      where: {
        companyId: companyId,
      },
      order: { accountId: 'DESC' },
    });

    return +(row ? row.accountId : 0);
  }

  toJSON() {
    return classToPlain(this);
  }

  protected self = FinAccountEntity;

  protected async beforeInsert(): Promise<any> {
    return await this.setLastEntryId('accountId');
  }
}
