import {Component, Injector, OnInit} from '@angular/core';
import {PageController} from "../../../page.controller";
import {FormController} from "../../../form.controller";

@Component({
  selector: 'movit-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class EmployeeFormComponent extends FormController<any> implements OnInit {
  constructor(
      override injector: Injector
  ) {
    super(injector)
  }

  ngOnInit(): void {}

  override getData(): void {

  }
}
