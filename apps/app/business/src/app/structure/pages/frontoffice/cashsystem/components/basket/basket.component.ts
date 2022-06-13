import { Component } from '@angular/core';
import { CashSystemStore } from '../../packages/services/cashsystem.store';

@Component({
  selector: 'movit-cashsystem-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class CashSystemBasketComponent {
  constructor(public store: CashSystemStore) {}
}
