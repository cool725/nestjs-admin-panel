import { Inject, Injectable, Optional } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITableOptions } from '@movit/app/common';
import {Cacheable} from "angular-cacheable";

@Injectable({
  providedIn:'root'
})
export class ProfilesAPI<Profile, FilterValues> {
  profile$ = new BehaviorSubject<Profile>(<any>null);
  profiles$ = new BehaviorSubject<ITableOptions<Profile>>(<any>null);

  constructor(
    @Optional()
    @Inject('apiPath')
    protected endpoint: string,
    private http: HttpClient
  ) {

  }

  protected getPath(path: string, subPath: string | number = ''): string {
    return (
      this.endpoint + '/profiles/' + path + '/' + (subPath ?  subPath : '')
    );
  }

  getProfile(profileId: number) {
    return this.http.get(this.getPath('profile', profileId));
  }

  getProfiles(filter:FilterValues): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.getPath('profile'),filter);
  }

  saveProfile(profile: Partial<Profile>) {
    return this.http.put(this.getPath('profile'), profile);
  }

  updateProfile(profileId: number, profile: Partial<Profile>) {
    return this.http.patch(this.getPath('profile', profileId), profile);
  }

  deleteProfile(profileId: number) {
    return this.http.delete(this.getPath('profile', profileId), {});
  }

  @Cacheable({

  })
  getSegments(){
    return this.http.get<any[]> (this.getPath('segment'));
  }
  @Cacheable({

  })
  getSources(){
    return this.http.get<any[]> (this.endpoint + '/sources/source');
  }
}
