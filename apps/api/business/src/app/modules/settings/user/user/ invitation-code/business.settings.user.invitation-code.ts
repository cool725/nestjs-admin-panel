import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Settings } from '../../../business.settings.namespace';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '@movit/api/auth';
import { UserInvitationService } from './business.settins.user-invitation.service';
import { GetCompany } from '../../../../../../../../../../libs/api/business/src/business.decorator';

@Controller(Settings.resolePath(Settings.User.UserInvitationPATH))
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
