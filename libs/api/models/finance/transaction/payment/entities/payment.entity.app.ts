import { BaseEntity, Column, Entity } from 'typeorm';

enum EPaymentFinalizedState {
  lost = -2,
  canceled = -1,
  open = 0,
  payed = 1,
  demand = 2,
}

@Entity('fin_payment')
export class FinTransactionEntity extends BaseEntity {
  @Column()
  paymentId: any;

  @Column({ type: 'integer', nullable: false })
  companyId: any;

  @Column({ type: 'integer', nullable: false })
  transactionId: any;

  @Column({ type: 'tinyint', default: 0 })
  finalized: EPaymentFinalizedState;

  @Column({
    type: 'date',
    nullable: false,
    comment: 'Accounting Date | Abbuchungsdatum',
  })
  accDate: string;

  // Values
  @Column({ type: 'double', nullable: false, default: 0.0 })
  price: number;

  // Referenzes
  @Column({ type: 'uuid', nullable: true })
  billId?: string;

  @Column({ type: 'tinyint', length: 3 })
  accountId: any;

  @Column({ type: 'tinyint', length: 10, nullable: true })
  lineId: number;

  constructor(params: Partial<FinTransactionEntity> = {}) {
    super();
    this.initialise(params);
  }

  protected initialise(params: Partial<FinTransactionEntity>) {
    if (params) Object.assign(this, params);
  }
}
