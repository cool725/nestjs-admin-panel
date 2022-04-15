import { Module } from '@nestjs/common';
import { AuthModule } from '@movit/api/auth';
import { BusinessModule } from '@movit/api/business';
import { BusinessSettingsUserInvitationController } from './business.settings.user.invitation-code';
import { UserInvitationService } from './business.settins.user-invitation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepositoryUserInvited } from '../../../../../../../../../../libs/api/auth/src/auth/classes/auth.repository.user.invited';

@Module({
  imports: [
    AuthModule,
    BusinessModule,
    TypeOrmModule.forFeature([AuthRepositoryUserInvited]),
  ],
  controllers: [BusinessSettingsUserInvitationController],
  providers: [UserInvitationService],
})
export class BusinessSettingsUserInvitationModule {}
