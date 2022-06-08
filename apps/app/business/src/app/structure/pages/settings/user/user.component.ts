import { Component, Injector } from '@angular/core';
import { ITableBaseFilter, Table } from '@movit/app/common';

import { PageController } from '../../page.controller';
import { SettingUserAPI } from '../../administration/user/packages/user-api.service';

interface User {
  userId: number;
  avatar: 'M' | 'W';
  gender: 'M' | 'W';
  firstName: string;
  lastName: string;
  birthDay: string;
  email: string;
  phone: string;
  total?: number; // numbers of apps
}

interface IFilter {
  title: string;
  id: string;
}

@Component({
  selector: 'movit-settings-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class SettingsUserComponent extends PageController {
  userTable = new Table<User, ITableBaseFilter>(this.userAPI.users$);
  filterItems: IFilter[] = [];

  constructor(override injector: Injector, public userAPI: SettingUserAPI) {
    super(injector);
  }

  getData() {
    this.getUsers();
  }

  getUsers() {
    this.onLoadAndSetData(
      this.userAPI.getUsers(),
      this.userAPI.users$,
      (rows: any) => ({ data: rows })
    );
  }

  saveUser(user: any) {
    const api = user.userId
      ? this.userAPI.updateUser(user)
      : this.userAPI.createUser(user);

    api.subscribe();
  }
}
