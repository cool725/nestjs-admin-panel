import { Component, Injector } from '@angular/core';
import { PageController } from '../../../page.controller';

import { EmployeeApi } from './employee.api.service';
import { ITableBaseFilter, Table } from '@movit/app/common';
import { Debounce } from '../../../../../../../../../../libs/app/common/decorators/app.decorator.debounce';

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
    this.onLoadAndSetData(this.api.get('employees'), this.api.employees$);
  }
}
