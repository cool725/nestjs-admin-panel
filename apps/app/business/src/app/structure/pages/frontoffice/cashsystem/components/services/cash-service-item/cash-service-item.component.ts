import { Component, Input} from '@angular/core';

@Component({
  selector:    'movit-cashsystem-service-row-item',
  templateUrl: './cash-service-item.component.html',
  styleUrls:  ['./cash-service-item.component.scss']
})
export class CashSystemServicesItemComponent  {
  @Input() items:any[];
}
