import { Component, Injector, OnInit } from '@angular/core';
import { PageController } from '../../../page.controller';
import { FinanceAPI } from '../external-accounting.service';
import { Subject } from 'rxjs';

class CashFlowTable {
  profitLossStatement: Subject<{ list: any[]; total: number }> = new Subject();
  revenueAndExpenses: Subject<{ list: any[]; total: number }> = new Subject();
  investingActivities: Subject<{ list: any[]; total: number }> = new Subject();
  financingActivities: Subject<{ list: any[]; total: number }> = new Subject();

  static filterByAccountTypes(
    transactions: any[],
    types: number[] = [],
    typ = 'debit'
  ) {
    return transactions.filter((transaction: any) =>
      types.includes(
        typ === 'debit'
          ? transaction.accountDebitType
          : transaction.accountCreditType
      )
    );
  }

  static filterByAccountCatCodes(
    transactions: any[],
    catCodes: number[] = [],
    typ = 'debit'
  ) {
    return transactions.filter((transaction: any) =>
      catCodes.includes(
        typ === 'debit'
          ? transaction.accountCatDebitCode
          : transaction.accountCatCreditCode
      )
    );
  }

  static getProfitLossTransactions(transactions: any[]) {
    return transactions.filter(
      (transaction: any) =>
        transaction.accountCatCreditCode > 300 ||
        transaction.accountCatDebitCode > 300 ||
        transaction.accountCatDebitCode < 100
    );
  }

  static getInvestingActivitiesTransactions(transactions: any[]) {
    return transactions.filter(
      (transaction: any) =>
        (transaction.accountCreditType == 3 ||
          transaction.accountCreditType == 4) &&
        transaction.accountDebitType != 1 &&
        (transaction.accountCatDebitCode < 140 ||
          transaction.accountCatDebitCode > 180) &&
        (transaction.accountCatCreditCode < 140 ||
          transaction.accountCatCreditCode > 180)
    );
  }

  static getInvestmentsTransactions(transactions: any[]) {
    return transactions
      .filter(
        (transaction: any) =>
          // kauf von sachanlagen durch flüssige mittel
          (transaction.accountCatDebitCode <= 180 &&
            transaction.accountCatDebitCode >= 140 &&
            transaction.accountCatCreditCode == 100) ||
          (transaction.accountCatCreditCode <= 180 &&
            transaction.accountCatCreditCode >= 140 &&
            transaction.accountCatDebitCode == 100)
      )
      .map((transaction) => {
        transaction.isInvestment =
          transaction.accountCatDebitCode == 100 ? -1 : 1;
        return transaction;
      });
  }

  static setPricingByAccountTypes(transactions: any[]) {
    return transactions.map((transaction: any) => {
      if ([4, 2].includes(transaction.accountDebitType)) {
        transaction.price *= -1;
        transaction._invertet = true;
      } else if (transaction.isInvestment > 0) {
        transaction.price *= -1;
        transaction._invertet = true;
      } else {
        transaction._invertet = false;
      }
      return transaction;
    });
  }

  static getSum(array: any[]) {
    let val = 0;
    for (let i = 0; i < array.length; i++) {
      val += array[i].price;
    }
    return val;
  }
}

@Component({
  selector: 'movit-cashflow',
  templateUrl: './cashflow.component.html',
  styleUrls: ['./cashflow.component.css'],
})
export class ExternalAccountingCashFlowComponent
  extends PageController
  implements OnInit
{
  cf = new CashFlowTable();

  constructor(override injector: Injector, private api: FinanceAPI) {
    super(injector);
    this.getData();
  }

  ngOnInit(): void {}

  getData() {
    this.onLoadAndSetData(
      this.api.getTransactions(),
      this.cf.revenueAndExpenses,
      (data: any[]) => {
        // set profitLossStatement
        this.cf.profitLossStatement.next(
          (() => {
            const profitLossStatementData =
              CashFlowTable.setPricingByAccountTypes(
                CashFlowTable.getProfitLossTransactions(data)
              );
            return {
              list: profitLossStatementData,
              total: CashFlowTable.getSum(profitLossStatementData),
            };
          })()
        );

        // set investingActivities
        this.cf.investingActivities.next(
          (() => {
            const investingActivitiesData =
              CashFlowTable.setPricingByAccountTypes(
                CashFlowTable.filterByAccountTypes(
                  CashFlowTable.getInvestmentsTransactions(data),
                  [3],
                  'debit'
                )
              );
            return {
              list: investingActivitiesData,
              total: CashFlowTable.getSum(investingActivitiesData),
            };
          })()
        );

        data = CashFlowTable.setPricingByAccountTypes(
          CashFlowTable.getInvestingActivitiesTransactions(data)
        );
        return {
          list: data,
          total: CashFlowTable.getSum(data),
        };
      }
    );
  }
}
