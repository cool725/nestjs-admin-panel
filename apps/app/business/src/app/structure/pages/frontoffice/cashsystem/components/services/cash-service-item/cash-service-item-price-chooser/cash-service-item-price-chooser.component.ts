import { Component} from '@angular/core';


interface IPriceClass{
  order: number
  priceClassId:string
  reduceType: "fixed"
  title: string
  value: number
}

@Component({
  selector:    'movit-cashsystem-service-item-price-chooser',
  templateUrl: './cash-service-item-price-chooser.component.html',
  styleUrls:  ['./cash-service-item-price-chooser.component.scss']
})
export class CashSystemServicesItemPriceChooserComponent  {

  prices = []

  bgColor:''

  public readonly  priceClasses = {
    profiles:<IPriceClass[]>[]
  }

  selectedPriceClass:IPriceClass

  setPriceClass(id,type){
    const price = this.priceClasses.profiles.find(p => p.priceClassId == id);
    this.selectedPriceClass = price

  }

  getPrice(priceVal):number{
    if(this.selectedPriceClass){

      switch (this.selectedPriceClass.reduceType){
        case 'fixed': {
          return      priceVal -  this.selectedPriceClass.value
        }
      }

    }
    return priceVal
  }

  clickAction(price){
    this.closeModal(price)
  }

  closeModal(item){}
}
