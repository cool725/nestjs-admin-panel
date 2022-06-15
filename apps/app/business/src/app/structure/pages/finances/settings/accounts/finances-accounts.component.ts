import {ChangeDetectorRef, Component, Injector, OnInit} from '@angular/core';
import { delay, first, map, Observable, Subject, tap } from 'rxjs';
import { PageController } from '../../../page.controller';
import {FinancesSettingsAccountsAPI} from "./finances-settings-accounts";

class Account {

  code:number

  static create  (data = {}) {
    Object.assign(new Account(),data)
  }
}

@Component({
  selector: 'movit-transaction-list',
  templateUrl: './finances-accounts.component.html',
  styleUrls: ['./finances-accounts.css'],
  providers:[FinancesSettingsAccountsAPI ]
})
export class FinanceAccountingComponent
  extends PageController
{

  accounts$: Subject<any[]> = new Subject();

  table = {
    keys:[
      {
        width:'8%',
        name:  'Code',
        key:   'code',
        type:  '',
        filter:false,
        sort:  true,
      },
      {
        name:  'Beschreibung',
        type:  '',
        key:  'name',
        filter:false,
        sort:  true,
      },
      {
        name:  'FiBu KAt.',
        key:   'categoryName',
        type:  '',
        filter:false,
        sort:  true,
      },
      {
        width:'8%',
        name:  'Typ',
        key:   'type',
        type:  '',
        filter:false,
        sort:  true,
        render(x){
          switch (x){
            case 'active': return 'Aktiven'
            case 'passive':return 'Passiven'
            case 'revenue':return 'Umsatz'
            case 'expense':return 'Aufwand'
            default : return x
          }
        }
      },
      {
        width:'8%',
        name:  'Source',
        key:   'externType',
        type:  '',
        filter:false,
        sort:  true,

      }
    ]
  }

  lists = [
    {
      name:'Umlaufvermögen',
      codeFrom:0,
      codeTill:1399,
    },
    {
      name:'Anlagevermögen',
      codeFrom:1400,
      codeTill:1999,
    },
    {
      name:'Kurzfristiges Fremdkapital',
      codeFrom:2000,
      codeTill:2399,
    } ,
    {
      name:'Langfristiges Fremdkapital',
      codeFrom:2400,
      codeTill:2999,
    },
    {
      name:'ER',
      codeFrom:3000,
      codeTill:9999,
    }
  ]

  tab   = 'Umlaufvermögen'

  loading = true;


  constructor(override injector: Injector,
              private cdr: ChangeDetectorRef,
              private api: FinancesSettingsAccountsAPI) {
    super(injector);
    this.getData();
  }

  clear() {
    this.accounts$.next([]);
  }

  getData() {
    this.onLoadAndSetData(
        this.api.getAccounts(), this.accounts$,
        data => data.map(a => Account.create(a)),
        ()=> this.updateView());
  }

  canShowCode(codeNr,from,till){
    return codeNr>= from && codeNr<= till
  }

  updateView(){
    this.cdr.detectChanges()
  }
}
