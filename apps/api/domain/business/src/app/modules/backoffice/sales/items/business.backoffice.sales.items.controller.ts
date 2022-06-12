import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BackOffice } from '../../business.backoffice.namespace';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard} from '@movit/api/auth';
import { CompanyEntity } from '@movit/api/business';
import { GetCompany } from '@movit/api/business';
import { CompanyService} from "@movit/api/business";
import { ProfilesPriceClassService } from "@movit/api/profiles";
import { Pagination } from "../../../../../../../../../../libs/api/common/decorator";

@Controller(BackOffice.resolePath(BackOffice.Sales.Items.PATH))
@UseGuards(AuthGuard(), CompanyGuard, /* AppsRolesGuard(14) */)
export class BusinessBackOfficeSalesItemsController {
  constructor(
    private companyService: CompanyService,
    private profilesPriceClassService: ProfilesPriceClassService
  ) {}

  @Get('/employees')
  async getEmployees(
    @GetCompany() business: CompanyEntity,
  ) {
    return this.companyService.getBusinessUsers(business)
        .then(rows => rows.map(row => ({
            userId:row.userId,
            avatar:row.avatar,
            firstName:row.firstName,
            lastName:row.lastName
          })))
  }

  @Get('/price-class')
  async getPriceClass(
    @GetCompany() business: CompanyEntity,
    @GetCompany() pagination: Pagination,
  ) {
    return this.profilesPriceClassService.getPriceClasses(business.companyId,pagination)
  }
}
