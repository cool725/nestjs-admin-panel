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
import { BusinessEntity } from '../../../../../../../../../libs/api/models/company/src/entities/business.entity';
import { GetCompany } from '../../../../../../../../../libs/api/models/company/src/company.decorator';
import { CompanyService} from "@movit/api/business";

@Controller(BackOffice.resolePath(BackOffice.Sales.Items.PATH))
@UseGuards(AuthGuard(), CompanyGuard, /* AppsRolesGuard(14) */)
export class BusinessBackOfficeSalesItemsController {
  constructor(private companyService: CompanyService) {}

  @Get('/employees')
  async getEmployees(
    @GetCompany() business: BusinessEntity,
  ) {
    return this.companyService.getBusinessUsers(business)
        .then(rows => rows.map(row => ({
            userId:row.userId,
            avatar:row.avatar,
            firstName:row.firstName,
            lastName:row.lastName
          })))
  }
}
