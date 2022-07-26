import { Controller, Get, UseGuards } from '@nestjs/common';
import { FrontOffice } from "../business.frontoffice.namespace";
import { GetCompany } from "@movit/api/business";
import { ICompany } from '@movit/api/business';
import { AuthUserEntity, CompanyGuard, GetUser } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import {SalesItemService} from "@movit/api/sales/item";
import { ProfilesPriceClassService, ProfilesService } from "@movit/api/profiles";
import { GetPagination, Pagination } from "../../../../../../../../../libs/api/common/decorator";

@Controller(FrontOffice.resolePaths([FrontOffice.CashSystem.PATHProfiles]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeCashSystemProfilesController {
  constructor(
    private profilesService: ProfilesService,
    private priceClassService: ProfilesPriceClassService,
  ) {}

  @Get('profiles')
  getProfiles(
      @GetCompany() company: ICompany,
      @GetPagination() pagination: Pagination,
  ) {
    return this.profilesService.getProfiles(company.companyId,pagination)
  }

  @Get('price-class')
  getProfilePriceClass(
      @GetCompany() company: ICompany,
      @GetPagination() pagination: Pagination,
  ) {
    return this.priceClassService.getPriceClasses(company.companyId,pagination)
  }

}
