import { Module } from '@nestjs/common';
import { BusinessSettingsUserController } from './business.settings.user.controller';

import { BusinessSettingsUserInvitationModule } from './ invitation-code/business.settings.user.invitation.module';

@Module({
  imports: [BusinessSettingsUserInvitationModule],
  controllers: [BusinessSettingsUserController],
  providers: [],
})
export class BusinessSettingsUserModule {}
