import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from "./classes/auth.repository.template";

@Injectable()
export class EmployeeService {
  constructor(@InjectRepository(EmployeeRepository) private employeeRepo: EmployeeRepository) {}

    create(){
      return this.employeeRepo.create()
    }

    getEmployeeByUserId(companyId:number,userId:string){
        return this.employeeRepo.findOne({
            where:{
                companyId,
                user: {
                    userId:userId
                }
            }
        })
    }

    getEmployeesFromCompany(companyId:number){
     return this.employeeRepo.find({
      where:{
        companyId
      },
       loadRelationIds:true
    })
    }
}
