import { Component, Injector, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Subject, tap } from 'rxjs';
import { SettingRoleAPI } from '../../../packages/apps-api.service';
import { SettingUserAPI } from '../../../packages/user-api.service';
import { FormController } from '../../../../../../form.controller';

@Component({
  selector: 'movit-role.form',
  templateUrl: './role.form.component.html',
  styleUrls: ['./role.form.component.css'],
})
export class RoleFormComponent extends FormController<any> {
  @Input() role$: Subject<any> = new BehaviorSubject<any>({ state: '1' });
  @Input() apps$: Subject<any> = new BehaviorSubject<any>({});
  @Input() users$: Subject<any> = new BehaviorSubject<any>([]);

  selectedApps: any = {};

  selectedUsers: any = {};

  toggleUserState = false;

  canSave = true;

  constructor(
    override injector: Injector,
    protected router: Router,
    protected userAPI: SettingUserAPI,
    public roleAPI: SettingRoleAPI
  ) {
    super(injector);
    this.getData();
  }

  getData() {
    this.getApps();
    this.getUsers();
    this.getRole();
  }

  getUsers() {
    this.userAPI
      .getUsers()
      .pipe(tap((role) => this.users$.next(role)))
      .subscribe();
  }

  getApps() {
    this.roleAPI
      .getApps()
      .pipe(
        map((map: any) => {
          map.forEach((app: any) => {
            if (!this.selectedApps[app.appId])
              this.selectedApps[app.appId] = '';
          });
          return map;
        }),
        tap((apps) => this.apps$.next(apps))
      )
      .subscribe();
  }

  getRole(roleId: any = this.getId()) {
    if (!roleId) return this.role$.next({ title: '' });
    return this.roleAPI
      .getRole(roleId)
      .pipe(
        tap((role: any) => {
          role.apps.map(
            (app: any) => (this.selectedApps[app.appId] = app.access)
          );
          role.users.map(
            (user: any) => (this.selectedUsers[user.userId] = true)
          );

          delete role.apps;
          delete role.users;
          this.role$.next(role);
        }),
        catchError((err) => {
          this.navBack();
          return err;
        })
      )
      .subscribe();
  }

  save(role: any) {
    if (!this.canSave) return;
    this.canSave = false;

    const apps = [];
    for (const key in this.selectedApps) {
      if (this.selectedApps[key])
        apps.push({
          appId: key,
          access: this.selectedApps[key],
        });
    }

    const users = [];
    for (const key in this.selectedUsers) {
      if (this.selectedUsers[key]) {
        users.push(key);
      }
    }

    const params = {
      ...role,
      apps,
      users,
    };

    const api = params.roleId
      ? this.roleAPI.updateRole(params)
      : this.roleAPI.createRole(params);

    api.subscribe();

    setTimeout(() => this.navBack(), 300);
  }

  async deleteRole(roleId: number) {
    if (confirm('Sicher?')) {
      await this.roleAPI.deleteRole(roleId).subscribe();
      this.navBack();
    }
  }

  toggleAllUsers(users: any[]) {
    this.toggleUserState = !this.toggleUserState;
    users.forEach((user) => {
      this.selectedUsers[user.userId] = this.toggleUserState;
    });
  }

  navBack() {
    this.router.navigate([this.basePath + '/settings/user/role/']);
  }
}
