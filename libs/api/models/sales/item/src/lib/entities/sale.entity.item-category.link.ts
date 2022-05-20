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
import { SaleItemCategoryEntity } from './sale.entity.item-category';

@Entity('sell_item_category_link')
@Index(['companyId', 'type'])
@Unique(['companyId', 'type', 'categoryId', 'itemId'])
export class SaleItemCategoryLinkEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  categoryId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  itemId: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'enum', enum: ['S', 'P'], nullable: false })
  type: 'S' | 'P';

  @ManyToOne(() => SaleItemEntity, (item) => item.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'type', referencedColumnName: 'type' },
    { name: 'itemId', referencedColumnName: 'itemId' },
  ])
  readonly item: SaleItemEntity;

  @ManyToOne(() => SaleItemCategoryEntity, (item) => item.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'type', referencedColumnName: 'type' },
    { name: 'categoryId', referencedColumnName: 'categoryId' },
  ])
  readonly category: SaleItemCategoryEntity;
}
