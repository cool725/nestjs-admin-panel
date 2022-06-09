import { Controller, Get, UseGuards } from '@nestjs/common';
import {FrontOffice} from '../business.frontoffice.namespace';
import { GetCompany } from "@movit/api/business";
import { ICompany } from '@movit/api/business';
import { AuthUserEntity, CompanyGuard, GetUser } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import {SalesItemService} from "@movit/api/sales/item";

@Controller(FrontOffice.resolePaths([FrontOffice.CashSystem.PATHItems]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontofficeCashSystemSettingsController {
  constructor(
    private itemService: SalesItemService
  ) {}

  @Get('services')
  getSources(
      @GetCompany() company: ICompany,
      @GetUser() user: AuthUserEntity,
  ) {
    return this.itemService.getServicesGrouped(
        company.companyId,1, {}
    )
  }

}
