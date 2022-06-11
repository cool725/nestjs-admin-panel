import { Component, Input} from '@angular/core';

@Component({
  selector:    'movit-cashsystem-service-item-price-chooser',
  templateUrl: './cash-service-item-price-chooser.component.html',
  styleUrls:  ['./cash-service-item-price-chooser.component.scss']
})
export class CashSystemServicesItemPriceChooserComponent  {
  prices = []
  bgColor:''

  clickAction(price){
    this.closeModal(price)
  }

  closeModal(item){}
}
