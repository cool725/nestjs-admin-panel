import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  delay,
  first,
  map,
  Observable,
  Subject,
  tap,
} from 'rxjs';
import { PageController } from '../../../page.controller';
import { FinancesSettingsAccountsAPI } from './finances-settings-accounts';

class Account {
  code: number;

  showInCashSystem: boolean;

  static create(data = {}) {
    return Object.assign(new Account(), data);
  }
}

@Component({
  selector: 'movit-transaction-list',
  templateUrl: './finances-accounts.component.html',
  styleUrls: ['./finances-accounts.css'],
  providers: [FinancesSettingsAccountsAPI],
})
export class FinanceAccountingComponent extends PageController {
  accounts$: Subject<Account[]> = new BehaviorSubject([]);

  table = {
    keys: [
      {
        width: '10%',
        name: 'Code',
        key: 'code',
        type: '',
        filter: false,
        sort: true,
      },
      {
        name: 'Beschreibung',
        width: '40%',
        type: '',
        key: 'name',
        filter: false,
        sort: true,
      },
      {
        name: 'FiBu KAt.',
        width: '13%',
        key: 'categoryName',
        type: '',
        filter: false,
        sort: true,
      },
      {
        width: '10%',
        name: 'Typ',
        key: 'type',
        type: '',
        filter: false,
        sort: true,
        render(x) {
          switch (x) {
            case 'active':
              return 'Aktiven';
            case 'passive':
              return 'Passiven';
            case 'revenue':
              return 'Umsatz';
            case 'expense':
              return 'Aufwand';
            default:
              return x;
          }
        },
      },
      {
        width: '8%',
        name: 'Source',
        key: 'externType',
        type: '',
        filter: false,
        sort: true,
      },
    ],
  };

  lists = [
    {
      name: 'Umlaufvermögen',
      codeFrom: 0,
      codeTill: 1399,
    },
    {
      name: 'Anlagevermögen',
      codeFrom: 1400,
      codeTill: 1999,
    },
    {
      name: 'Kurzfristiges Fremdkapital',
      codeFrom: 2000,
      codeTill: 2399,
    },
    {
      name: 'Langfristiges Fremdkapital',
      codeFrom: 2400,
      codeTill: 2999,
    },
    {
      name: 'ER',
      codeFrom: 3000,
      codeTill: 9999,
    },
  ];

  tab = 'Umlaufvermögen';

  loading = true;

  constructor(
    override injector: Injector,
    private cdr: ChangeDetectorRef,
    private api: FinancesSettingsAccountsAPI
  ) {
    super(injector);
    this.getData();
  }

  clear() {
    this.accounts$.next([]);
  }

  getData() {
    this.onLoadAndSetData(
      this.api.getAccounts(),
      this.accounts$,
      (data) => data.map((a) => Account.create(a)),
      () => this.updateView()
    );
  }

  canShowCode(codeNr, from, till) {
    return codeNr >= from && codeNr <= till;
  }

  updateAccount(account: Account) {
    this.api.updateAccount(account).subscribe();
  }

  updateView() {
    this.cdr.detectChanges();
  }
}
