import { CashSystemBasket } from './cashsystem.basket.class';

enum AccountId {
  'Cash' = 117,
}

export class CashSystemAccount {
  name: string;
  accountId: number;
}

export class AccountSelectionHandler {
  public accountId: number = AccountId.Cash;

  constructor(private basket: CashSystemBasket) {}

  public setAccountId(id: number) {
    this.accountId = id;
    this.onAccountIdChanged();
  }

  protected onAccountIdChanged() {
    const payments = this.basket.payments.filter((i) => !i.finalized);
    /*
         if(payments.length === 1){
             if( replacePayment ) payments[0].accountId = id;
             this.doUpdate();
         }
        * */
  }

  get accountSelectionIsCash() {
    return this.accountId == AccountId.Cash;
  }
}
