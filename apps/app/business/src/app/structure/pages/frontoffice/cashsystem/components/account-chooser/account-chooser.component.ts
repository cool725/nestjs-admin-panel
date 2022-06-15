import { Component } from '@angular/core';
import {CashSystemStore} from "../../packages/services/cashsystem.store";

@Component({
  selector: 'movit-cashsystem-account-chooser',
  templateUrl: './account-chooser.component.html',
  styleUrls: ['./account-chooser.component.scss'],
})
export class CashSystemAccountChooserComponent {

  get accountSelectionId(){
    return this.store.basket.accountSelectionId
  }
  set accountSelectionId(id:number){
    this.store.basket.accountIdChange(id,true)
  }

  constructor(public store:CashSystemStore) {}

  formatName(str){
    if(!str)return'';
    if((str+'').includes('Forderungen aus Leistungen')){
        str = (str+'').includes('Rechnung') ?(str+'').replace('Forderungen aus Leistungen','')
            .replace('(','').replace(')','')
            : (str+'').replace('Forderungen aus Leistungen','Rechnung')

    }
    return  str;
  }
}
