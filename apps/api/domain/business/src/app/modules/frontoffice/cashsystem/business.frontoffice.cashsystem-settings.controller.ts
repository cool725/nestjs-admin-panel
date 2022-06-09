import { Controller, Get, UseGuards } from '@nestjs/common';
import {FrontOffice} from '../business.frontoffice.namespace';
import { ReservationService } from '@movit/api/reservation';
import { GetCompany } from "@movit/api/business";
import { CompanyEntity } from '../../../../../../../../../libs/api/models/company/src/entities/companyEntity';
import { AuthUserEntity, CompanyGuard, GetUser } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import { ProfilesService } from '@movit/api/profiles';
import { GetPagination, Pagination } from "../../../../../../../../../libs/api/common/decorator";
import { EmployeeService } from "@movit/api/models/employee";
import {CashSystemDeviceService} from "@movit/api/models/cashsystem";

@Controller(FrontOffice.resolePaths([FrontOffice.CashSystem.PATHSettings]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontofficeCashSystemSettingsController {
  constructor(
    protected cashSystemDeviceService: CashSystemDeviceService,
  ) {}

  @Get('healthcheck')
  getSources(
      @GetCompany() company: CompanyEntity,
      @GetUser() user: AuthUserEntity,
  ) {
    return company.companyId
  }
}
