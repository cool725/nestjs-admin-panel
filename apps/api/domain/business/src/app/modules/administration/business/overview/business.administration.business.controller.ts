import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Administration } from '../../business.administration.namespace';
import { GetCompany } from '@movit/api/business';
import { CompanyEntity } from '@movit/api/business';
import { CompanyService } from '@movit/api/business';
import { AuthGuard } from '@nestjs/passport';
import {
  // AuthUserEntity,
  // GetUser,
  CompanyGuard,
} from '@movit/api/auth';

@Controller(Administration.resolePath(Administration.Business.Path))
@UseGuards(AuthGuard(), CompanyGuard)
export class BusinessAdministrationBusinessController {
  constructor(private businessService: CompanyService) { }

  @Get('')
  getBusinessList(
    @GetCompany() business: CompanyEntity,
    // @GetUser() user: AuthUserEntity
  ) {
    /* Get linked companies */
    // this.businessService.getAllowedBusinessListFromUser();

    return { data: [business.toSimpleJson()] };
  }

  @Get(':businessId')
  getOrganisations(
    @Param('businessId') businessId: string,
    @GetCompany() business: CompanyEntity,
    // @GetUser() user: AuthUserEntity
  ) {
    /* Get linked companies */
    // this.businessService.getAllowedBusinessListFromUser();
    return business.toSimpleJson();
  }
}
