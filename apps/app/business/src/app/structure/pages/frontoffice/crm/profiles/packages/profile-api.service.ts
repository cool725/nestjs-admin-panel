import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITableOptions } from '@movit/app/common';
import { Cacheable } from 'angular-cacheable';

@Injectable({
  providedIn: 'root',
})
export class ProfilesAPI<Profile> {
  profile$ = new BehaviorSubject<Profile>(null);
  profiles$ = new BehaviorSubject<ITableOptions<Profile>>(null);

  constructor(
    @Optional()
    @Inject('apiPath')
    protected endpoint: string,
    private http: HttpClient
  ) {}

  protected getPath(path: string, subPath: string | number = ''): string {
    return this.endpoint + '/profiles/' + path + '/' + (subPath ? subPath : '');
  }

  getProfile(profileId: number) {
    return this.http.get(this.getPath('profile', profileId));
  }

  getProfiles(filter: HttpParams): Observable<{data:Profile[]}> {
    return this.http.get<{data:Profile[]}>(this.getPath('profile'), {
      params: filter,
    });
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

  getSegments() {
    return this.http.get<any[]>(this.getPath('segment'));
  }

  @Cacheable({})
  getAllSegments() {
    console.warn('remove this and add as param: paginate:false')
    return this.http.get<any[]>(this.getPath('segment-all'));
  }

  @Cacheable({})
  getSources() {
    return this.http.get<any[]>(this.endpoint + '/profiles/sources/');
  }

  @Cacheable({})
  getPriceClass() {
    return this.http.get<any[]>(this.endpoint + '/profiles/price-class/');
  }
}
