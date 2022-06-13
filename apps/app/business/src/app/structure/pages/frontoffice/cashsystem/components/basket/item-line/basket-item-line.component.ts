import {Component, Input} from '@angular/core';
import {CashSystemStore} from "../../../packages/services/cashsystem.store";
import {ItemBillGroup} from "../../../packages/classes/cashsystem.basket.class";

@Component({
  selector: 'movit-cashsystem-basket-item-line',
  templateUrl: './basket-item-line.component.html',
  styleUrls: ['./basket-item-line.component.scss'],
})
export class CashSystemBasketItemLineComponent {

  @Input( ) billGroup:ItemBillGroup

  constructor(public store:CashSystemStore) {}
}
