import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'movit-cashsystem-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashSystemReceiptComponent {

  @Input() total: number = 0;
  @Input() paid: number = 0;
  @Input() invoice: number = 0;
  @Input() change: number = 0;

}
