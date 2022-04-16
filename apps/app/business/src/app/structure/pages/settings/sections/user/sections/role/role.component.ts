import { Component, Injector } from '@angular/core';
import { SettingUserAPI } from '../../packages/user-api.service';
import { PageController } from '../../../../../page.controller';

import { SettingRoleAPI } from '../../packages/apps-api.service';
import { Confirmable } from '@movit/app/decorators';
import { ITableBaseFilter, Table } from '@movit/app/common';

@Component({
  selector: 'movit-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent extends PageController {
  rolesTable = new Table<any, ITableBaseFilter>(this.userAPI.roles$);

  constructor(
    override injector: Injector,
    private userAPI: SettingUserAPI,
    private roleAPI: SettingRoleAPI
  ) {
    super(injector);
  }

  getData() {
    this.onLoadAndSetData(this.userAPI.getRoles(), this.userAPI.roles$);
  }

  @Confirmable({
    title: 'Möchten Sie wircklich diese Role löschen?',
  })
  async deleteRole(roleId: number) {
    this.roleAPI.deleteRole(roleId).subscribe(() => this.reloadData());
  }
}
