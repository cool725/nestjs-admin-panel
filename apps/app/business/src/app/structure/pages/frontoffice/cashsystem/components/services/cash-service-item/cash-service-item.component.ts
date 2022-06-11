import { Component, Input} from '@angular/core';
import {ItemCategory} from "../../../packages/classes/cashsystem.item.class";
import {CashSystemStore} from "../../../packages/services/cashsystem.store";

@Component({
  selector:    'movit-cashsystem-service-row-item',
  templateUrl: './cash-service-item.component.html',
  styleUrls:  ['./cash-service-item.component.scss']
})
export class CashSystemServicesItemComponent  {
  @Input() row:number;

  @Input() category:ItemCategory;

  @Input() items:any[];

  @Input() bgColor:any;

  constructor(private store:CashSystemStore) {}

  settings = {
    displayType:1,
    showOnlyLowestItem:true
  }

  canShow(){
    return true
  }

  clickAction(item:any){
    // verify if has mulitple prices
    // is yes open selection modal
    this.store.basket.itemAdd(item,{})
  }
}
