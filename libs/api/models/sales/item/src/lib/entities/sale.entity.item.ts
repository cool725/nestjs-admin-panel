import { instanceToPlain } from 'class-transformer';

import {
  AfterUpdate,
  BeforeInsert,
  BeforeRemove,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { SaveOptions } from 'typeorm/repository/SaveOptions';
import { SaleItemCategoryLinkEntity } from './sale.entity.item-category.link';
import { SaleItemPriceEntity } from './sale.entity.item.price';
import { TenantCompanyTranslatableEntity } from '@movit/api/business';
import Translatable from '../../../../../../common/decorator/decorator.translatable';
import {SaleItemEmployeeEntity} from "./sale.entity.item.employee";

@Entity('sell_item')
@Index(['companyId'])
@Index(['companyId', 'type'])
@Unique(['companyId', 'type', 'itemId'])
export class SaleItemEntity extends Translatable(TenantCompanyTranslatableEntity) {
  self = SaleItemEntity;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  itemId: number;

  @Column({ type: 'enum', enum: ['S', 'P'], nullable: false })
  type: 'S' | 'P';

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @OneToMany(() => SaleItemCategoryLinkEntity, (category) => category.item)
  categories: number[];

  @OneToMany(() => SaleItemPriceEntity, (price) => price.item, )
  prices: SaleItemPriceEntity[];

  @OneToMany(() => SaleItemEmployeeEntity, (e) => e.item)
  employees: SaleItemEmployeeEntity[];

  public getId() {
    return this.itemId;
  }

  @BeforeInsert()
  protected async beforeInsert() {
    await this.setLastEntryId('itemId');
  }

  @AfterUpdate()
  protected afterUpdate() {
    this.saveTranslations();
  }

  @BeforeRemove()
  protected beforeRemove() {
    this.removeTranslations();
  }

  public toJSON() {
    return instanceToPlain(this);
  }

  update(options?: SaveOptions): Promise<this> {
    return this.save(options).then((a) => {
      // it seems that save() is not triggering AfterUpdate like in the category
      // therefore trigger afterupdate manually
      // todo figureout why this is not working
      this.afterUpdate();
      return a;
    });
  }
}
