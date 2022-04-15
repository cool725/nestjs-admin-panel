import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable()
export class SettingUserAPI {
  users$ = new Subject<any[]>();
  roles$ = new Subject<any[]>();

  constructor(private http: HttpClient) {}

  getPath(path: string) {
    return environment.api.url + '/settings' + path;
  }

  getUser(userId: string) {
    return this.http.get(this.getPath('/user/getUser/' + userId));
  }

  getUsers() {
    return this.http.get(this.getPath('/user/getUsers'));
  }

  getRoles() {
    return this.http.get(this.getPath('/role/getRoles'));
  }
  getUserFromRole(roleId: number) {
    return this.http.get(this.getPath('/role/getUsersFromRole/' + roleId));
  }

  createUser(user: any) {
    return this.http.post(this.getPath('/user/createUser'), user);
  }

  updateUser(user: any) {
    return this.http.patch(
      this.getPath('/user/updateUser/' + user.userId),
      user
    );
  }

  getInvitedUsers() {
    return this.http.get(this.getPath('/user/invitation/getInvitedUsers'));
  }

  inviteUser(email: string) {
    return this.http.post(this.getPath('/user/invitation/inviteUser'), {
      email,
    });
  }

  deleteInviteUser(email: string) {
    return this.http.delete(
      this.getPath('/user/invitation/deleteInviteUser/' + email),
      {}
    );
  }
}
