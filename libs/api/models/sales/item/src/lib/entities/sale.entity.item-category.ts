import { Exclude, instanceToPlain } from 'class-transformer';

import {
  AfterInsert,
  AfterUpdate,
  BaseEntity,
  BeforeInsert,
  BeforeRemove,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { SaleItemCategoryLinkEntity } from './sale.entity.item-category.link';
import { SaveOptions } from 'typeorm/repository/SaveOptions';
import { TenantCompanyTranslatableEntity } from '../../../../../company/src/tentant/company.tentant';
import Translatable from '../../../../../../common/decorator/decorator.translatable';

@Entity('sell_item_category')
@Index(['companyId'])
@Index(['companyId', 'type'])
@Unique(['companyId', 'type', 'categoryId'])
export class SaleItemCategoryEntity extends Translatable(
  TenantCompanyTranslatableEntity,
  'cat'
) {
  @Exclude() self: any = SaleItemCategoryEntity;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  categoryId: number;

  @Column({ type: 'varchar', length: 8, nullable: true })
  color: number;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  enabled: boolean;

  @Column({ type: 'enum', enum: ['S', 'P'], nullable: false })
  type: 'S' | 'P';

  @OneToMany(() => SaleItemCategoryLinkEntity, (item) => item.category)
  readonly items: SaleItemCategoryLinkEntity[];

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  parentCategoryId: number;

  public toJSON() {
    return instanceToPlain(this);
  }

  public getId() {
    return this.categoryId;
  }

  @BeforeInsert()
  async beforeInsert() {
    await this.setLastEntryId('categoryId');
  }

  @AfterUpdate()
  afterUpdate() {
    this.saveTranslations();
  }

  @BeforeRemove()
  beforeRemove() {
    this.removeTranslations();
  }

  update(options?: SaveOptions): Promise<this> {
    return this.save(options);
  }
}
