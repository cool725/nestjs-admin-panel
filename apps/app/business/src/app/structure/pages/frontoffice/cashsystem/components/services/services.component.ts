import {Component, Input} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'movit-cashsystem-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class CashSystemServicesComponent {

  @Input() allowedTabs  = [
    'manual',
    'services',
    'products',
    'coupons',
    'res',
    'cBills',
    'orders',
    'history',
  ]

  @Input() currentTab = 'services'

  services$:BehaviorSubject<any[]>

  setDefault(){
    this.allowedTabs = [
      'manual',
      'services',
      'prodcuts',
      'coupons',
      'res',
      'cBills',
      'orders',
      'history',
    ]
  }

  canShowTab(tabName: string){
    if(!this.allowedTabs)this.setDefault();
    return this.allowedTabs &&this.allowedTabs.includes(tabName)
  }

  changeView(value: string){
    this.currentTab = value
  }

}
