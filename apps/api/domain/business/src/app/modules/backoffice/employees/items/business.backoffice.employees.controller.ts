import {Controller, Get, Param, Put, UseGuards} from '@nestjs/common';
import {BackOffice} from '../../business.backoffice.namespace';
import { AuthGuard } from '@nestjs/passport';
import {AuthService, AuthUserEntity, CompanyGuard} from '@movit/api/auth';
import {EmployeeService} from "@movit/api/models/employee";
import {CompanyService, GetCompany} from "@movit/api/business";
import {CompanyEntity} from "../../../../../../../../../../libs/api/models/company/src/entities/companyEntity";

@Controller(BackOffice.resolePath(BackOffice.Employees.PATHBase))
@UseGuards(AuthGuard(), CompanyGuard)
export class BusinessBackofficeEmployeesController {
  constructor(
      private companyService:CompanyService,
      private employeeService:EmployeeService,
      private authUserService:AuthService,
  ) {}

  @Get('')
  getEmployees(@GetCompany() { companyId }: CompanyEntity) {
    return this.employeeService.getEmployeesFromCompany(companyId);
  }

  @Get('users')
  async getNonAssignedUsers(@GetCompany() company:CompanyEntity) {
    const users = await this.companyService.getBusinessUsers(company);
    const employees = await this.employeeService.getEmployeesFromCompany(company.companyId,{
      loadRelationIds:true,
    })
    return users.filter(user => !employees.find(employee => employee['user'] === user.userId));
  }

  @Put('createEmployeeFromUser/:userId')
  async createEmployeeFromUser(
      @GetCompany() { companyId }: CompanyEntity,
      @Param('userId') userId: string
  ) {
    let employee = await this.employeeService.getEmployeeByUserId(companyId,userId);;
    if(employee) return false
    employee = this.employeeService.create()
    let user = await this.authUserService.getUserByUserId(userId);
    employee.companyId = companyId;
    employee.user      = user;
    employee.email     = user.email
    employee.firstName = user.firstName
    employee.lastName  = user.lastName

    return employee.save()
  }
}
