import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SettingRoleAPI {
  constructor(private http: HttpClient) {}

  getPath(path: string): string {
    return environment.api.url + '/settings' + path;
  }

  getRoles() {
    return this.http.get(this.getPath('/role/getRoles'));
  }

  getRole(roleId: number) {
    return this.http.get(this.getPath('/role/getRole/' + roleId));
  }

  getApps() {
    return this.http.get(this.getPath('/role/getApps'));
  }

  createRole(role: any) {
    return this.http.post(this.getPath('/role/createRole/'), role);
  }

  updateRole(role: any) {
    return this.http.patch(
      this.getPath('/role/updateRole/' + role.roleId),
      role
    );
  }

  deleteRole(roleId: any) {
    return this.http.delete(this.getPath('/role/deleteRole/' + roleId));
  }
}
