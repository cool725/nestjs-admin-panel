import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { ITableOptions } from '@movit/app/common';

@Injectable()
export class ProfilesAPI<Profile> {
  profile$ = new BehaviorSubject<Profile>(<any>null);
  profiles$ = new BehaviorSubject<ITableOptions<Profile>>(<any>null);

  constructor(private http: HttpClient) {}

  protected getPath(path: string):string {
    return environment.api.url + '/frontoffice/profiles' + (path ? '/' + path : '')
  }

  getProfile(profileId: string) {
    return this.http.get(this.getPath(profileId));
  }

  getProfiles() {
    return this.http.get<Profile[]>(this.getPath(''));
  }

  createProfile(profile: Partial<Profile>) {
    return this.http.post(this.getPath(''), profile);
  }

  updateProfile(profileId: string, profile: Partial<Profile>) {
    return this.http.patch(this.getPath(profileId), profile);
  }

  deleteProfile(profileId: string) {
    return this.http.delete(
      this.getPath( profileId ),
      {}
    );
  }
}
