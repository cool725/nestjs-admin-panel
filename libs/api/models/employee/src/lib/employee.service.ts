import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from "./classes/auth.repository.template";
import {IsNull} from "typeorm";
import {AuthUserEntity} from "@movit/api/auth";

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

    getEmployeesFromCompany(companyId:number, params = {}){
        return this.employeeRepo.find({
            where:{
                companyId,
                deletedAt:IsNull()
            },
            ... params,
            cache:{
                id:companyId+'_employees',
                milliseconds:300000
            }
        })
    }

    async removeEmployeesFromCompany(companyId:number,userId:string){
        const employee = await this.employeeRepo.findOne({
            where:{
                companyId,
                user:{
                    userId:userId
                }
            }
        })
        return  employee ? employee.softRemove() : null
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
