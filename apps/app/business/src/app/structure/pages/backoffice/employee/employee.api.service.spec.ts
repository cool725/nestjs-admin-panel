import { TestBed } from '@angular/core/testing';

import { Employee.ApiService } from './employee.api.service';

describe('Employee.ApiService', () => {
  let service: Employee.ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Employee.ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
