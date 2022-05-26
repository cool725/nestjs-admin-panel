import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Administration } from '../../../business.administration.namespace';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '@movit/api/auth';
import { UserInvitationService } from './business.administration.user-invitation.service';
import { GetCompany } from '../../../../../../../../../../../libs/api/models/company/src/company.decorator';

@Controller(Administration.resolePath(Administration.User.UserInvitationPATH))
@UseGuards(AuthGuard(), CompanyGuard)
export class BusinessSettingsUserInvitationController {
  constructor(private userInvitationService: UserInvitationService) {}
  @Get('getInvitedUsers')
  getInvitedUsers(@GetCompany() business) {
    return this.userInvitationService.getInvitedUsers(business.businessId);
  }
  @Post('inviteUser')
  inviteUser(@Body() body, @GetCompany() business) {
    return this.userInvitationService.inviteUser(
      body.email,
      business.businessId
    );
  }
  @Delete('deleteInviteUser/:email')
  deleteInviteUser(@Param('email') email, @GetCompany() business) {
    return this.userInvitationService.deleteEntry(email, business.businessId);
  }
}
