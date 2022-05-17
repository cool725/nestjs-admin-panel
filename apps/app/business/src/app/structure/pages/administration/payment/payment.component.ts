import { Component, Injector } from '@angular/core';
import { PageController } from '../../page.controller';
import { ITableBaseFilter, Table } from '@movit/app/common';
import { PaymentAPI } from './payment-api.service';
import { Debounce } from 'libs/app/common/decorators/app.decorator.debounce';

export class Payment {
  paymentId: number;
  companyId: number;

  static create(params: Partial<Payment>) {
    return Object.assign(new Payment(), params);
  }
}
@Component({
  selector: 'movit-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent extends PageController {
  public paymentTable: Table<Payment, ITableBaseFilter> = new Table<
    Payment,
    ITableBaseFilter
  >(this.api.payments$, {
    searchValue: '',
    keys: ['title', 'color', 'percentage'],
  });

  constructor(private api: PaymentAPI<any>, override injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  getData(): void {
    this.getPayments();
  }

  @Debounce(300)
  getPayments() {
    // console.log(this.paymentTable.filterValues.searchValue)
    // this.onLoadAndSetData(
    //   this.api.payments(this.paymentTable.getFilterValuesAsHttpParams()),
    //   this.api.payments$,
    //   (rows: Payment[]) => ({ data: rows })
    // );
  }
}
