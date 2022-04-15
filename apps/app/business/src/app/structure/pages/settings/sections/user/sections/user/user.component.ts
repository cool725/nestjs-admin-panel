import { Component, Injector } from '@angular/core';
import { PageController } from '../../../../../page.controller';
import { SettingUserAPI } from '../../packages/user-api.service';
import { TableHelper } from '@movit/app/common';

@Component({
  selector: 'movit-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent extends PageController {
  userTable = new TableHelper<any>(this.userAPI.users$);

  constructor(override injector: Injector, public userAPI: SettingUserAPI) {
    super(injector);
  }

  getData() {
    this.getUsers();
  }

  getUsers() {
    this.onLoadAndSetData(this.userAPI.getUsers(), this.userAPI.users$);
  }

  saveUser(user: any) {
    const api = user.userId
      ? this.userAPI.updateUser(user)
      : this.userAPI.createUser(user);

    api.subscribe();
  }
}
