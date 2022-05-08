import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITableOptions } from '@movit/app/common';
import { environment } from '../../../../../environments/environment';

export interface IBusiness {
  companyId: number;
  logoSrc: string;
  titleFull: string;
  location: number;
}

@Injectable()
export class BusinessAPI {
  businesses$ = new BehaviorSubject<ITableOptions<IBusiness>>(undefined as any);
  business$ = new BehaviorSubject<IBusiness>(<any>null);

  constructor(private http: HttpClient) {}

  private getPath(path: string | number) {
    return environment.api.url + '/administration/business/' + path;
  }

  getBusinessList(filterParams: HttpParams) {
    return this.http.get(this.getPath(''), { params: filterParams });
  }

  getBusinesses(businessId: number) {
    return this.http.get(this.getPath(businessId));
  }
}
