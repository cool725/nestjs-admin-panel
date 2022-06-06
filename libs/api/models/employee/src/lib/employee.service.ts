import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {EmployeeRepository} from "./classes/auth.repository.template";
import { AuthUserEntity } from "@movit/api/auth";

@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(EmployeeRepository) private employeeRepo: EmployeeRepository) {}

  getEmployeesFromCompany(companyId:number){
   return this.employeeRepo.find({
      where:{
        companyId
      }
    })
  }
  async setUserAsEmployeeOfCompany(companyId:number, userId:string){
    let employee = await this.employeeRepo.findOne({
      where:{
        companyId,
        user:{ userId: userId }
      }
    });

    if( employee) return true;

     employee = this.employeeRepo.create();
     employee.companyId = companyId;

     // todo: load user and set values
     employee.user = Object.assign(new AuthUserEntity(),{userId:userId})
     await this.employeeRepo.save(employee)

    return true
  }
}
