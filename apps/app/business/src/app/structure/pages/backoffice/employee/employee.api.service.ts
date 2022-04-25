import { Injectable } from '@angular/core';
import { AppApiBase } from '@movit/app/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITableOptions } from '@movit/app/common';

@Injectable()
export class EmployeeApi<T, F = any> extends AppApiBase<T, F> {
  protected baseUrl = '/employees/';

  employees$ = new BehaviorSubject<ITableOptions<T>>(<any>null);

  constructor(override http: HttpClient) {
    super(http);
  }
}
