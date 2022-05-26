import {
  AfterInsert,
  AfterUpdate,
  BaseEntity, BeforeInsert, BeforeRemove,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { SaleItemEntity } from './sale.entity.item';
import Translatable from "../../../../../../common/decorator/decorator.translatable";
import {TenantCompanyTranslatableEntity} from "../../../../../company/src/tentant/company.tentant";

@Entity('sell_item_price')
@Index(['companyId', 'type'])
@Unique(['companyId', 'type', 'itemId', 'priceId'])
export class SaleItemPriceEntity extends Translatable(TenantCompanyTranslatableEntity,'sip') {
  self = SaleItemPriceEntity;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  itemId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'enum', enum: ['S', 'P'], nullable: false })
  type: 'S' | 'P';

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  priceId: number;

  @Column({ type: 'double', nullable: true, default: 0.0 })
  priceSell: number;

  @Column({ type: 'double', nullable: true, default: 0.0 })
  priceBuy: number;

  @Column({ type: 'smallint', nullable: true, unsigned:true })
  crmPriceClassId:number;

  @Column({ type: 'smallint', nullable: true, default: 0 })
  duration: number;
  //bufferTimeStart:Date;
  //bufferTimeEnd:Date;

  @Column({ type: 'json', nullable: true })
  options: number;

  @ManyToOne(() => SaleItemEntity, (item) => item.prices, {
        onDelete: 'CASCADE',
  })
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'type', referencedColumnName: 'type' },
    { name: 'itemId', referencedColumnName: 'itemId' },
  ])
  readonly item: SaleItemEntity;

  images = [];

  public getId() {
    return this.itemId;
  }

  @BeforeInsert()
  protected async beforeInsert() {
    await this.setLastEntryId('priceId')
  }

  @AfterInsert()
  @AfterUpdate()
  protected afterUpdate() {
    this.saveTranslations();
  }

  @BeforeRemove()
  protected beforeRemove() {
    this.removeTranslations();
  }

}
