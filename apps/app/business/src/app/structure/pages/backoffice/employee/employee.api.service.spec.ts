import { TestBed } from '@angular/core/testing';

import { EmployeeApi } from './overview/employee.api.service';

describe('Employee.ApiService', () => {
  let service: EmployeeApi<any, any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
