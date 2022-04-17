import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { ITableOptions } from '@movit/app/common';

@Injectable()
export class ProfilesAPI<Profile,FilterValues> {
  profile$ = new BehaviorSubject<Profile>(<any>null);
  profiles$ = new BehaviorSubject<ITableOptions<Profile>>(<any>null);

  constructor(private http: HttpClient) {}

  protected getPath(path: string, subPath:string | number = ''):string {
    return environment.api.url + 'profiles' + path + (subPath ? '/' + subPath : '')
  }

  getProfile(profileId: string) {
    return this.http.get(this.getPath(  'profile', profileId));
  }

  getProfiles():Observable<Profile[]> {
    return this.http.get<Profile[]>(this.getPath('profile'));
  }

  saveProfile(profile:Partial<Profile>) {
    return this.http.put(this.getPath('profile'),profile);
  }

  updateProfile(profileId: number, profile : Partial<Profile>) {
    return this.http.patch( this.getPath('profile' , profileId),profile);
  }

  deleteProfile(profileId: string) {
    return this.http.delete(
      this.getPath( profileId ),
      {}
    );
  }
}
