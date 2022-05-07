import { Component, Injector, OnInit } from '@angular/core';
import { PageController } from '../../page.controller';

@Component({
  selector: 'movit-settings-overview',
  templateUrl: './administration-overview.component.html',
  styleUrls: ['./administration-overview.component.css'],
})
export class AdministrationOverviewComponent
  extends PageController
  implements OnInit
{
  constructor(override injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  getData(): void {}
}
