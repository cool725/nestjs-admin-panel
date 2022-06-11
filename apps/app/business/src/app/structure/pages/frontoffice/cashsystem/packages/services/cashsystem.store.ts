import {Injectable, NgModule} from '@angular/core';
import {CashSystemBasket} from "../classes/cashsystem.basket.class";

@Injectable()
export class CashSystemStore {

  basket:CashSystemBasket = new CashSystemBasket()


}
