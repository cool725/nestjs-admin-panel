import {Injectable, NgModule} from '@angular/core';
import {CashSystemBasket} from "../classes/cashsystem.basket.class";
import { BehaviorSubject } from "rxjs";
import {ICashSystemSettings} from "../interfaces/cashsystem.interface";

@Injectable()
export class CashSystemStore {

  public basket:CashSystemBasket = new CashSystemBasket();

  public settings$:BehaviorSubject<ICashSystemSettings>

  public accounts$:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  priceClasses = {
    profiles$: new BehaviorSubject([])
  }
}
