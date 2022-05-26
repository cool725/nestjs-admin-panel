import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard, GetUser } from '@movit/api/auth';
import { GetCompany } from '../../../../../../../libs/api/models/company/src/company.decorator';
import { Company, CompanyService } from "@movit/api/business";

@Controller()
@UseGuards(AuthGuard())
export class BusinessController {
  constructor(protected companyAPI: CompanyService) {}

  @Get('company')
  @UseGuards(CompanyGuard)
  getData(@GetCompany() company: Company) {
    return company.toSimpleJson();
  }

  @Get('invitationCode/:code')
  invitationCode(@GetUser() user, @Param('code') invitationCode) {
    return this.companyAPI.signUserByInvitationCode(user, invitationCode);
  }

  @Get('user/me')
  getSelf(@GetUser() user) {
    return user;
  }
}
