import { Component, Injector, OnInit } from '@angular/core';
import { FormController } from '../../../form.controller';

@Component({
  selector: 'movit-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css'],
})
export class AgendaFormComponent extends FormController<any> implements OnInit {
  viewSettings: any = {
    mode: 'mode',
  };

  constructor(override injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {}

  override getData(): void {}
}
