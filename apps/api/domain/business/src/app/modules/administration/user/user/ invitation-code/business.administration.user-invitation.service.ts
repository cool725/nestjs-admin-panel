import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepositoryUserInvited } from '../../../../../../../../../../../libs/api/models/auth/auth-user/src/auth/classes/auth.repository.user.invited';
import { Mailer } from '../../../../../../../../../../../libs/api/common/classes';

@Injectable()
export class UserInvitationService {
  constructor(
    @InjectRepository(AuthRepositoryUserInvited)
    private userInvited: AuthRepositoryUserInvited
  ) {}

  getInvitedUsers(businessId) {
    return this.userInvited.getInvitedCompaniesFromUser(businessId);
  }

  async inviteUser(email, businessId) {
    const invitationCode = await this.userInvited.verifyInvitationOrCreate(
      email,
      businessId
    );

    if (invitationCode) {
      const mail = new Mailer.Mail();
      mail.sendEmail(
        email,
        'Sie wurden eingeladen',
        Mailer.Mail.loadTemplate(
          'invitation-code.html',
          Mailer.Mail.path().resolve(__dirname, '..', 'auth', 'templates/html'),
          (html) =>
            Mailer.Mail.parse(html, {
              code: invitationCode,
            })
        )
      );
    }
  }

  deleteEntry(email, businessId) {
    return this.userInvited.deleteCompanyInvitationFromUser(email, businessId);
  }
}
