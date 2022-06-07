import { Injectable } from '@angular/core';
import { AppApiBase } from '@movit/app/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITableOptions } from '@movit/app/common';
import { environment } from 'apps/app/business/src/environments/environment';

@Injectable()
export class EmployeeApi<T, F = any> extends AppApiBase<T, F> {
  protected baseUrl = environment.api.url + '/backoffice/employees/';

  employees$ = new BehaviorSubject<ITableOptions<T>>(null);

  constructor(override http: HttpClient) {
    super(http);
  }

  getEmployees(){
    return this.get('');
  }

  getEmployee(employeeId:number){
   return this.get(employeeId)
  }

  getNonAssignedUsers(){
    // returns users that are not marked as  employees
    return this.http.get<any[]>(this.getUrl('users'))
  }

  createEmployeeFromUser(userId:string){
    return this.http.put<any>(this.getUrl('createEmployeeFromUser/' + userId),{})
  }
}
