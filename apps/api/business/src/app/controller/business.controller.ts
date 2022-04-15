import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard, GetUser } from '@movit/api/auth';
import { GetCompany } from '../../../../../../libs/api/business/src/business.decorator';
import { BusinessEntity } from '../../../../../../libs/api/business/src/entities/business.entity';
import { BusinessService } from '@movit/api/business';

@Controller()
@UseGuards(AuthGuard())
export class BusinessController {
  constructor(protected businessAPI: BusinessService) {}
  @Get('company')
  @UseGuards(CompanyGuard)
  getData(@GetCompany() business: BusinessEntity) {
    return business.toSimpleJson();
  }

  @Get('invitationCode/:code')
  invitationCode(@GetUser() user, @Param('code') invitationCode) {
    return this.businessAPI.signUserByInvitationCode(user, invitationCode);
  }
}
