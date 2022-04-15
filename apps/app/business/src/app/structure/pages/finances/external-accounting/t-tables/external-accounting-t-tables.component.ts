import { Component, Injector } from '@angular/core';

import { mergeMap, Observable } from 'rxjs';
import { FinanceAPI } from '../external-accounting.service';
import { PageController } from '../../../page.controller';

@Component({
  selector: 'movit-external-accounting-test',
  templateUrl: './external-accounting-t-tables.component.html',
  styleUrls: ['./external-accounting-t-tables.component.css'],
  providers: [],
})
export class ExternalAccountingTTablesComponent extends PageController {
  public tAccounts$: Observable<any>;

  constructor(override injector: Injector, private financeAPI: FinanceAPI) {
    super(injector);
    this.getData();
  }

  getData() {
    const transactions$ = this.financeAPI.getTransactions();

    this.tAccounts$ = this.financeAPI.getTAccounts().pipe(
      mergeMap(
        () => transactions$,
        (accountTypes: any, transactions: any) => {
          const filterAccounts = (account: any, reverse: boolean = false) => {
            const credits = transactions.filter(
              (taction: any) => taction.accountCreditId === account.accountId
            );

            const debits = transactions.filter(
              (taction: any) => taction.accountDebitId === account.accountId
            );

            if (reverse) {
              return {
                debits: credits,
                credits: debits,
              };
            }

            return { debits, credits };
          };
          const getSum = (
            previousValue: number,
            currentValue: { price: number }
          ) => (previousValue || 0) + (currentValue?.price || 0);

          const sortByCode = (a: { code: number }, b: { code: number }) =>
            a.code - b.code;

          accountTypes.debits = accountTypes.debits
            .map((account: any) => {
              account.transactions = filterAccounts(account);
              console.log(account.transactions.credits);
              account.creditTotal = account.transactions.credits.reduce(
                getSum,
                0
              );
              account.debitTotal = account.transactions.debits.reduce(
                getSum,
                0
              );
              return account;
            })
            .sort(sortByCode);

          accountTypes.credits = accountTypes.credits
            .map((account: any) => {
              account.transactions = filterAccounts(account);
              account.creditTotal = account.transactions.credits.reduce(
                getSum,
                0
              );
              account.debitTotal = account.transactions.debits.reduce(
                getSum,
                0
              );
              return account;
            })
            .sort(sortByCode);

          return accountTypes;
        }
      )
    );
  }
}
