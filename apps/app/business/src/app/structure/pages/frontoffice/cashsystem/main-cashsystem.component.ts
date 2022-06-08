import { Component } from '@angular/core';
import { PageController } from '../../page.controller';

@Component({
  selector: 'movit-main-cashsystem',
  templateUrl: './main-cashsystem.component.html',
  styleUrls: ['./main-cashsystem.component.scss'],
})
export class MainCashSystemComponent extends PageController {
  getData(): void {
    throw new Error('Method not implemented.');
  }
}
