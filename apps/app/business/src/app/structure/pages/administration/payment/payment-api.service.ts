import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITableOptions } from '@movit/app/common';

@Injectable({
  providedIn: 'root',
})
export class PaymentAPI<Profile> {
  payment$ = new BehaviorSubject<Profile>(<any>null);
  payments$ = new BehaviorSubject<ITableOptions<Profile>>(<any>null);

  constructor(
    @Optional()
    @Inject('apiPath')
    protected endpoint: string,
    private http: HttpClient
  ) {}

  protected getPath(path: string, subPath: string | number = ''): string {
    return this.endpoint + '/profiles/' + path + '/' + (subPath ? subPath : '');
  }
}
