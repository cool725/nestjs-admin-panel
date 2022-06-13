import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude } from 'class-transformer';

type ETransactionType = 'S' | 'P' | 'D' | 'M';

enum ETransactionFinalizedState {
  lost = -2,
  canceled = -1,

  open = 0,

  payed = 1,
  demand = 2,
}

@Entity('fin_transaction')
@Unique(['companyId', 'transactionId'])
export class FinTransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  uuId: string;

  @Column({ type: 'bigint', nullable: false, unsigned: true })
  transactionId: number;

  @Column({ type: 'integer', nullable: false, unsigned: true })
  companyId: number;

  @Column({ type: 'integer', nullable: true, unsigned: true })
  itemId: any;

  // D = Discount
  // S = Service
  // P = Product
  // M = Manual
  @Column({ type: 'enum', enum: ['S', 'P', 'D', 'M'], nullable: false })
  typ: ETransactionType;

  @Column({ type: 'tinyint', default: 0 })
  finalized: ETransactionFinalizedState;

  @Column({
    type: 'date',
    nullable: false,
    comment: 'Accounting Date | Abbuchungsdatum',
  })
  accDate: string;

  @Column({
    type: 'date',
    nullable: true,
    comment: 'Leistungsdatum  | Leistung erbracht am',
  })
  finDate: string;

  // Values
  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'double', nullable: false, default: 0.0 })
  price: number;

  @Column({ type: 'double', nullable: false })
  amount: number;

  // Referenzes
  @Column({ type: 'uuid', nullable: true })
  billId?: string;

  @Column({ type: 'tinyint', scale: 5, unsigned: true })
  accountDebitId: any;

  @Column({ type: 'tinyint', scale: 5, unsigned: true })
  accountCreditId: any;

  @Column({ type: 'integer', unsigned: true, nullable: true })
  paymentId: number;

  @Column({ type: 'tinyint', scale: 10, nullable: true })
  priceId: number;

  @Column({ type: 'tinyint', scale: 10, nullable: true })
  lineId: number;

  accountDebitName: string;

  constructor(params: Partial<FinTransactionEntity> = {}) {
    super();
    this.initialise(params);
  }

  static async getHighestTransactionId(companyId: number) {
    const row = await FinTransactionEntity.findOne({
      where: {
        companyId: companyId,
      },
      order: { transactionId: 'DESC' },
    });

    return +(row ? row.transactionId : 0);
  }

  protected initialise(params: Partial<FinTransactionEntity>) {
    if (params) Object.assign(this, params);
  }
}
