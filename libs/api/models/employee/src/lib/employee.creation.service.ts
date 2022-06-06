import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {EmployeeRepository} from "./classes/auth.repository.template";

@Injectable()
export class EmployeeCreationService {
  constructor(@InjectRepository(EmployeeRepository) private employeeRepo: EmployeeRepository) {}
  createEmployeeFromUser(companyId:number, userId:string){
    const employee = this.employeeRepo.create();
    employee.companyId = companyId;
    employee.user.userId = userId;
    return employee.save()
  }
}
