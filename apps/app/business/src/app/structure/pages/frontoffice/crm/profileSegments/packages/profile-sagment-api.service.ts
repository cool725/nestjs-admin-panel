import { Inject, Injectable, Optional } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITableOptions } from '@movit/app/common';

@Injectable({
  providedIn:'root'
})
export class ProfileSagmentAPI<Segment, FilterValues> {
  profileSegment$ = new BehaviorSubject<Segment>(<any>null);
  profileSegments$ = new BehaviorSubject<ITableOptions<Segment>>(<any>null);

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

  getSegments(): Observable<Segment[]> {
    return this.http.get<Segment[]>(this.getPath('segment'));
  }

  saveProfile(profile: Partial<Segment>) {
    return this.http.put(this.getPath('segment'), profile);
  }

  updateProfile(profileId: number, profile: Partial<Segment>) {
    return this.http.patch(this.getPath('segment', profileId), profile);
  }

  deleteProfile(profileId: number) {
    return this.http.delete(this.getPath('segment', profileId), {});
  }
}
