import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Administration } from '../../business.administration.namespace';
import { GetCompany } from "@movit/api/business";
import { AuthGuard } from '@nestjs/passport';
import { CompanyService } from '@movit/api/business';
import { CompanyEntity } from '@movit/api/business';
import { AuthService, CompanyGuard } from '@movit/api/auth';
import { EmployeeService } from "@movit/api/models/employee";

@Controller(Administration.resolePath(Administration.User.UserPATH))
@UseGuards(AuthGuard(), CompanyGuard)
export class BusinessAdministrationUserController {
  constructor(
    private businessService: CompanyService,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  @Get('getUsers')
  getUsers(@GetCompany() business: CompanyEntity) {
    return this.businessService.getBusinessUsers(business);
  }

  @Get('getUsersWithInfo')
  async getUsersWithInfo(@GetCompany() business: CompanyEntity) {
    const users = await this.businessService.getBusinessUsers(business);
    const employees = await this.employeeService.getEmployeesFromCompany(business.companyId);
    return {
      page:1,
      data:users,
      count:users.length,
      countEmployees: employees.length,
      countAdministrators: 1, // to implement
    }
  }

  @Get('getUser/:userId')
  getUser(
    @GetCompany() business: CompanyEntity,
    @Param('userId') userId: string
  ) {
    return this.businessService.getBusinessUser(business, userId);
  }

  @Post('createUser')
  async createUser(@GetCompany() company: CompanyEntity, @Body() userData: any) {
    userData.password = userData.password || '*****';
    const user = await this.authService.signUp(userData).then(async ({ userId }) => {
      return this.businessService.addUserToBusinessRole(
        company,
        await this.authService
          .getUserByUserId(userId)
          .then((user) => user.initialise(userData).save())
      );
    });

    if( userData.isEmployee ){
      this.employeeService.setUserAsEmployeeOfCompany(company.companyId,user.user.userId)
    }

    return user
  }

  @Patch('updateUser/:userId')
  updateUser(
    @GetCompany() business: CompanyEntity,
    @Param('userId') userId: string,
    @Body() userData: any
  ) {
    return this.businessService.updateBusinessUser(business, userData);
  }

  @Delete('deleteUser/:userId')
  deleteUser(
    @GetCompany() company: CompanyEntity,
    @Param('userId') userId: string,
    @Body() userData: any
  ) {
    this.employeeService.removeEmployeesFromCompany(company.companyId,userId);
    return this.businessService.deleteBusinessUser(company, userId);
  }
}
