import { Controller, Get, UseGuards } from '@nestjs/common';
import { FrontOffice } from '../business.frontoffice.namespace';
import { GetCompany } from "@movit/api/business";
import { CompanyEntity } from '@movit/api/business';
import { CompanyGuard } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import { CashSystemDeviceService } from "@movit/api/models/cashsystem";

@Controller(FrontOffice.resolePaths([FrontOffice.CashSystem.PATHSettings]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontofficeCashSystemSettingsController {
  constructor(
    protected cashSystemDeviceService: CashSystemDeviceService,
  ) { }

  @Get('healthcheck')
  getSources(
    @GetCompany() company: CompanyEntity,
    // @GetUser() user: AuthUserEntity,
  ) {
    return company.companyId
  }
}
