import { Component, Input} from '@angular/core';
import {ItemCategory} from "../../../packages/classes/cashsystem.item.class";
import {CashSystemStore} from "../../../packages/services/cashsystem.store";
import {DataEmitter, EDataEmitterType} from "@movit/app/common";
import {
  CashSystemServicesItemPriceChooserComponent
} from "./cash-service-item-price-chooser/cash-service-item-price-chooser.component";

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

  constructor(private dE:DataEmitter, private store:CashSystemStore) {}

  settings = {
    displayType:1,
    showOnlyLowestItem:true
  }

  canShow(){
    return true
  }

  async clickAction(item:any){
    // verify if has mulitple prices
    // is yes open selection modal
    let price = item.prices[0];

    if(item.prices.length > 1){
      price = await this.showPriceChooser(item)
    }

    this.store.basket.itemAdd(item,price)
  }

  showPriceChooser(item){
    return new Promise(resolve => {
      this.dE.emit(EDataEmitterType.ModalOpen,
          {
            component: CashSystemServicesItemPriceChooserComponent,
            data: {
              style:{
                maxWidth:'520px',
                height:'max-content',
                left:'0',
                right:'0',
                top:'0',
                bottom:'0',
                margin:'auto',
                display:'block',
              },
              injectableData:{
                prices: item.prices,
                bgColor:this.bgColor
              }
            },
          },resolve
      )
    })
  }
}
