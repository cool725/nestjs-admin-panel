export class Payment {
  billId: any;
  finalized: number;
  date: string;
  accountId: number;
  price: number;
  active = true;
  blocked;

  static create(payment: Partial<Payment>): Payment {
    return Object.assign(new Payment(), payment);
  }
}
