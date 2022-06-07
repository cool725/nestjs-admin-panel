import { Component, Injector } from '@angular/core';
import { PageController } from '../../page.controller';

@Component({
  selector: 'movit-settings-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class SettingsUserComponent extends PageController {
  userTable = {};

  constructor(override injector: Injector) {
    super(injector);
  }

  getData() {
    this.getUsers();
  }

  getUsers() { }
}
