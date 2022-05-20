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
import { SaleItemEntity } from './sale.entity.item';

@Entity('sell_item_price')
@Index(['companyId', 'type'])
@Unique(['companyId', 'type', 'itemId', 'priceId'])
export class SaleItemPriceEntity extends BaseEntity {
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

  @Column({ type: 'double', nullable: false, default: 0.0 })
  price: number;

  @ManyToOne(() => SaleItemEntity, (item) => item.prices)
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'type', referencedColumnName: 'type' },
    { name: 'itemId', referencedColumnName: 'itemId' },
  ])
  readonly item: SaleItemEntity;
}
