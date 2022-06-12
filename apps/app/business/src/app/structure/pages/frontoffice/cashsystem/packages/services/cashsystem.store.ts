import {Injectable, NgModule} from '@angular/core';
import {CashSystemBasket} from "../classes/cashsystem.basket.class";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class CashSystemStore {

  basket:CashSystemBasket = new CashSystemBasket();

  priceClasses = {
    profiles: new BehaviorSubject([])
  }
}
