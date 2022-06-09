import {
  BeforeInsert,
  Column, CreateDateColumn, DeleteDateColumn,
  Entity, Index, JoinColumn, OneToOne,
  PrimaryGeneratedColumn, Unique
} from "typeorm";
import { TenantCompanyEntity } from "@movit/api/business";
import { AuthUserEntity } from "@movit/api/auth";

//todo: move to other model
@Entity('fin_device')
@Index(['companyId'])
@Unique(['companyId', 'deviceId'])
export class CashSystemDeviceEntity extends TenantCompanyEntity  {
  protected self: any  = CashSystemDeviceEntity;

  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  deviceId: string;

  @Column({ enum: ['cashsystem'], nullable: false })
  deviceType: string;

  @Column({ type: 'string', nullable: true })
  deviceReference: string; // internalId

  @Column({ type: 'boolean', default:true })
  enabled!: boolean;

  @Column({ type: 'text', nullable: true })
  settings!:any;

  @CreateDateColumn()
  created!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @BeforeInsert()
  async beforeInsert() {
    await this.setLastEntryId('deviceId');
  }
}
