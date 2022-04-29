import { Inject, Injectable, Optional } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITableOptions } from '@movit/app/common';

@Injectable({
  providedIn:'root'
})
export class ProfileSagmentAPI<sagment, FilterValues> {
  profilesagment$ = new BehaviorSubject<sagment>(<any>null);
  profilesagments$ = new BehaviorSubject<ITableOptions<sagment>>(<any>null);

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

  getSagment(profileId: number) {
    return this.http.get(this.getPath('segment', profileId));
  }

  getSegments(): Observable<sagment[]> {
    return this.http.get<sagment[]>(this.getPath('profile'));
  }

  saveProfile(profile: Partial<sagment>) {
    return this.http.put(this.getPath('profile'), profile);
  }

  updateProfile(profileId: number, profile: Partial<sagment>) {
    return this.http.patch(this.getPath('profile', profileId), profile);
  }

  deleteProfile(profileId: number) {
    return this.http.delete(this.getPath('profile', profileId), {});
  }
}
