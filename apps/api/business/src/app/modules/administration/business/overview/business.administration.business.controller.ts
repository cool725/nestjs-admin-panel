import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Administration } from '../../business.administration.namespace';
import { GetCompany } from '../../../../../../../../../libs/api/models/business/src/business.decorator';
import { BusinessEntity } from '../../../../../../../../../libs/api/models/business/src/entities/business.entity';
import { BusinessService } from '@movit/api/business';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser, CompanyGuard, GetUser } from '@movit/api/auth';

@Controller(Administration.resolePath(Administration.Business.Path))
@UseGuards(AuthGuard(), CompanyGuard)
export class BusinessAdministrationBusinessController {
  constructor(private businessService: BusinessService) {}

  @Get('')
  getBusinessList(
    @GetCompany() business: BusinessEntity,
    @GetUser() user: AuthUser
  ) {
    /* Get linked companies */
    // this.businessService.getAllowedBusinessListFromUser();

    return { data: [business.toSimpleJson()] };
  }

  @Get(':businessId')
  getOrganisations(
    @Param('businessId') businessId: string,
    @GetCompany() business: BusinessEntity,
    @GetUser() user: AuthUser
  ) {
    /* Get linked companies */
    // this.businessService.getAllowedBusinessListFromUser();
    return business.toSimpleJson();
  }
}
