import { Module } from '@nestjs/common';
import { BusinessAdministrationUserController } from './business.administration.user.controller';

import { BusinessAdministrationUserInvitationModule } from './ invitation-code/business.administration.user.invitation.module';

@Module({
  imports: [BusinessAdministrationUserInvitationModule],
  controllers: [BusinessAdministrationUserController],
  providers: [],
})
export class BusinessAdministrationUserModule {}
