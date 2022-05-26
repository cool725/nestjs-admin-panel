import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { SaleItemEntity } from './sale.entity.item';
import { TenantCompanyEntity } from "@movit/api/business";

@Entity('sell_item_employee')
@Index(['companyId', 'type'])
@Unique(['companyId', 'type', 'itemId', 'employeeId'])
export class SaleItemEmployeeEntity extends TenantCompanyEntity {
  self = SaleItemEmployeeEntity;

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'enum', enum: ['S', 'P'], nullable: false })
  type: 'S' | 'P';

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  itemId: number;

  @Column({ type: 'bigint', unsigned: true, nullable: false })
  employeeId: number;

  @ManyToOne(() => SaleItemEntity, (item) => item.employees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    { name: 'companyId', referencedColumnName: 'companyId' },
    { name: 'type', referencedColumnName: 'type' },
    { name: 'itemId', referencedColumnName: 'itemId' },
  ])
  readonly item: SaleItemEntity;

  public getId() {
    return this.id;
  }

  @BeforeInsert()
  protected async beforeInsert() {

  }

}
