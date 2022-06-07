import { Component, Injector } from '@angular/core';
import { PageController } from '../../../page.controller';

import { EmployeeApi } from './employee.api.service';
import { ITableBaseFilter, Table } from '@movit/app/common';
import { Debounce } from '@movit/app/common';

class Employee {
  employeeId: number;
  companyId: number;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  gender: string;
  avatar: string;
  birthDay: string;
}

type ITableEmployeeFilter = ITableBaseFilter;

@Component({
  selector: 'movit-backoffice-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeOverviewComponent extends PageController {
  tableEmployees = Table.create<Employee, ITableEmployeeFilter>(
    this.api.employees$,
    {
      page: 0,
      searchValue: '',
    }
  );


  users:any[]

  constructor(
    override injector: Injector,
    protected api: EmployeeApi<Employee, ITableEmployeeFilter>
  ) {
    super(injector);
  }

  getData(): void {
    this.getEmployees();
  }

  @Debounce(500)
  getEmployees() {
    this.onLoadAndSetData(this.api.get(''), this.api.employees$,
        (rows:any)=>({data:rows}));
  }

  showActionModal(){
    // Get user list

    // Show modal
    this.api.getUsers().subscribe((users) => {
      this.users = users
      if(this.users.length == 0){
        // create a non assigned employee / show forms
      }

    })
  }

  createEmployeeFromUser(userId:string){
    this.api.createEmployeeFromUser(userId).subscribe()
  }
}
