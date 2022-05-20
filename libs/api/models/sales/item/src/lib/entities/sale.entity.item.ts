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
import { SaleItemPriceEntity } from './sale.entity.item.prices';
import { TenantEntityTranslatable } from '../../../../../../common/db/db.CoreEntity';
import Translatable from '../../../../../../common/decorator/decorator.translatable';

@Entity('sell_item')
@Index(['companyId'])
@Index(['companyId', 'type'])
@Unique(['companyId', 'type', 'itemId'])
export class SaleItemEntity extends Translatable(TenantEntityTranslatable) {
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

  @OneToMany(() => SaleItemPriceEntity, (price) => price.item, {
    onDelete: 'CASCADE',
  })
  prices: SaleItemPriceEntity[];

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
