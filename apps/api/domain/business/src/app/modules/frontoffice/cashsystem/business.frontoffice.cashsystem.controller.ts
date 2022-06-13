import { Controller, Get, UseGuards } from '@nestjs/common';
import { FrontOffice } from '../business.frontoffice.namespace';
import { CompanyGuard } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import { CashSystemDeviceService } from "@movit/api/models/cashsystem";
import { GetCompany } from "@movit/api/business";
import { CompanyEntity } from '@movit/api/business';

@Controller(FrontOffice.resolePaths([FrontOffice.CashSystem.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeCashSystemController {
  constructor(
    protected cashSystemDeviceService: CashSystemDeviceService,
  ) { }


  @Get('healthcheck')
  healthCheck(
    @GetCompany() company: CompanyEntity,
  ) {
    return company.companyId
  }

  @Get('settings')
  getSettings(
    @GetCompany() company: CompanyEntity,
  ) {
    return company.companyId
  }

  @Get('finances/accounts')
  getAccounts( ) {
    return []
  }

}
