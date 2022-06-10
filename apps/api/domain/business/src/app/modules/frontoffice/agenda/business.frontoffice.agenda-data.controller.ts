/* eslint-disable @typescript-eslint/no-unused-vars */

import { Controller, Get, UseGuards } from '@nestjs/common';
import { FrontOffice } from '../business.frontoffice.namespace';
import { ReservationService } from '@movit/api/reservation';
import { GetCompany } from "@movit/api/business";
import { CompanyEntity } from '@movit/api/business';
import { AuthUserEntity, CompanyGuard, GetUser } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import { ProfilesService } from '@movit/api/profiles';
import { GetPagination, Pagination } from "../../../../../../../../../libs/api/common/decorator";
import { EmployeeService } from "@movit/api/models/employee";

@Controller(FrontOffice.resolePaths([FrontOffice.Agenda.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontofficeAgendaDataController {
  constructor(
    protected reservationService: ReservationService,
    protected profilesService: ProfilesService,
    protected employeeService: EmployeeService,
  ) { }

  @Get('profiles')
  getProfiles(
    @GetCompany() company: CompanyEntity,
    @GetUser() user: AuthUserEntity,
    @GetPagination() pagination: Pagination
  ) {
    return this.profilesService.getProfilesPaginated(company.companyId, pagination);
  }

  @Get('employees')
  getEmployees(
    @GetCompany() company: CompanyEntity,
    @GetUser() user: AuthUserEntity,
    @GetPagination() pagination: Pagination
  ) {
    return this.employeeService.getEmployeesFromCompany(company.companyId)
  }

  @Get('sources')
  getSources(
    @GetCompany() company: CompanyEntity,
    @GetUser() user: AuthUserEntity,
    @GetPagination() pagination: Pagination
  ) {
    return []
  }

}
