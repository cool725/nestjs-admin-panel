import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard, GetUser } from '@movit/api/auth';
import { GetCompany } from "@movit/api/business";
import { ICompany, CompanyService } from "@movit/api/business";

@Controller()
@UseGuards(AuthGuard())
export class BusinessController {
  constructor(protected companyAPI: CompanyService) {}

  @Get('company')
  @UseGuards(CompanyGuard)
  getData(@GetCompany() company: ICompany) {
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
