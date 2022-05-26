import { Module } from '@nestjs/common';
import { AuthModule } from '@movit/api/auth';
import { CompanyModule } from '@movit/api/business';
import { BusinessSettingsUserInvitationController } from './business.administration.user.invitation-code';
import { UserInvitationService } from './business.administration.user-invitation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepositoryUserInvited } from '../../../../../../../../../../../libs/api/models/auth/auth-user/src/auth/classes/auth.repository.user.invited';

@Module({
  imports: [
    AuthModule,
    CompanyModule,
    TypeOrmModule.forFeature([AuthRepositoryUserInvited]),
  ],
  controllers: [BusinessSettingsUserInvitationController],
  providers: [UserInvitationService],
})
export class BusinessAdministrationUserInvitationModule {}
