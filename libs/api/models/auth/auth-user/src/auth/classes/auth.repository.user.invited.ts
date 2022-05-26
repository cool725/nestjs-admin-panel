import { EntityRepository, Repository } from 'typeorm';
import { AuthUserInvited } from '../entities/auth.entity.user.invited';

@EntityRepository(AuthUserInvited)
export class AuthRepositoryUserInvited extends Repository<AuthUserInvited> {
  constructor() {
    super();
  }

  getInvitedCompaniesFromUser(companyId: string) {
    return this.find({
      where: {
        companyId: companyId,
      },
    });
  }

  async deleteCompanyInvitationFromUser(email: string, companyId: string | number): Promise<any> {
    return this.delete({
      email: email || '-1',
      companyId: companyId || '-1',
    });
  }
  async verifyInvitationOrCreate(
    email: string,
    companyId: string | number
  ): Promise<boolean | string> {
    const user = await this.findOne({
      where: {
        email: email,
        companyId: companyId,
      },
    });

    if (!user) {
      const newUser = this.create();
      newUser.companyId = companyId;
      newUser.email = email;
      await newUser.save();
      return newUser.invitationId;
    }

    // verify timestap
    if (+new Date() - +new Date(<any>user.updatedAt) > 300000) {
      user.updatedAt = new Date();
      user.save();
      return user.invitationId;
    }

    return false;
  }
}
