import { Injectable } from '@angular/core';
import { AppApiBase } from '@movit/app/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITableOptions } from '../../../../../../../../../libs/app/common/lib/helper/helper.table.class';

@Injectable()
export class EmployeeApi<T, F = any> extends AppApiBase<T, F> {
  protected baseUrl = '/employees/';

  employees$ = new BehaviorSubject<ITableOptions<T>>(<any>null);

  constructor(override http: HttpClient) {
    super(http);
  }
}
