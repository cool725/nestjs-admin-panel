import { Component, Injector, OnInit } from '@angular/core';
import { PageController } from '../../page.controller';

@Component({
  selector: 'movit-settings-overview',
  templateUrl: './settings-overview.component.html',
  styleUrls: ['./settings-overview.component.css'],
})
export class SettingsOverviewComponent
  extends PageController
  implements OnInit
{
  constructor(override injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  getData(): void {}
}
