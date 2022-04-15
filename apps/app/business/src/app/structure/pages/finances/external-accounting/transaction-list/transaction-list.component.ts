import { Component, Injector, OnInit } from '@angular/core';
import { FinanceAPI } from '../external-accounting.service';
import { delay, first, map, Observable, Subject, tap } from 'rxjs';
import { PageController } from '../../../page.controller';

interface Transaction {
  accDate: number;

  accountCreditId: number;
  accountCreditName: number;

  accountDebitId: number;
  accountDebitName: number;

  amount: number;
  billId: string;
  companyId: number;
  finDate: string;
  finalized: number;
  itemId: number;
  lineId: number;
  paymentId: number;
  price: number;
  priceId: number;
  title: string;
  transactionId: string;
  typ: string;
  uuId: string;
}

@Component({
  selector: 'movit-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class ExternalAccountingTransactionListComponent
  extends PageController
  implements OnInit
{
  transactions$: Subject<Transaction[]> = new Subject();
  accounts$: Subject<any[]> = new Subject();

  constructor(override injector: Injector, private api: FinanceAPI) {
    super(injector);
    this.getData();
  }

  ngOnInit(): void {}

  clear() {
    this.transactions$.next([]);
    this.accounts$.next([]);
  }

  getData() {
    this.onLoadAndSetData(this.api.getTransactions(), this.transactions$);
    this.onLoadAndSetData(this.api.getAccounts(), this.accounts$);
  }

  /**
   * Todo:
   * Überprfüen, ob bei Ertrag und Aufwände
   * */
  async createTransaction() {
    const getEl: any = (c: any) => document.getElementById(c);
    await this.api
      .setTransactions({
        transactions: [
          {
            finalized: 1,
            amount: 1,
            price: +getEl('total')?.value,
            title: getEl('desc')?.value,
            accountDebitId: +getEl('debit-acc')?.value,
            accountCreditId: +getEl('credit-acc')?.value,
            accDate: '2022-02-02',
            finDate: '2022-02-02',
            typ: 'M',
          },
        ],
      })
      .pipe(
        delay(100),
        tap(() => this.getData())
      )
      .subscribe();
  }
}
