import { Component, Injector } from '@angular/core';
import { PageController } from '../../../../page.controller';
import { SettingUserAPI } from '../../packages/user-api.service';
import { ITableBaseFilter, Table } from '@movit/app/common';

interface IUser {
  userId: number;
  avatar: 'M' | 'W';
  gender: 'M' | 'W';
  firstName: string;
  lastName: string;
  birthDay: string;
  email: string;
  phone: string;
  role?: string; // administrator // user
  total?: number; // numbers of apps
}

@Component({
  selector: 'movit-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent extends PageController {
  userTable = new Table<IUser, ITableBaseFilter>(this.userAPI.users$);

  constructor(override injector: Injector, public userAPI: SettingUserAPI) {
    super(injector);
  }

  getData() {
    this.getUsers();
  }

  getUsers() {
    this.onLoadAndSetPaginatedData(
      this.userAPI.getUsersWithInfo(),
      this.userAPI.users$,
      this.userTable
    );
  }

  saveUser(user: any) {
    const api = user.userId
      ? this.userAPI.updateUser(user)
      : this.userAPI.createUser(user);

    api.subscribe();
  }
}
