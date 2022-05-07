import { EntityRepository, Repository } from 'typeorm';
import { AuthUserInvited } from '../entities/auth.entity.user.invited';

@EntityRepository(AuthUserInvited)
export class AuthRepositoryUserInvited extends Repository<AuthUserInvited> {
  constructor() {
    super();
  }

  getInvitedUsers(businessId: string) {
    return this.find({
      where: {
        businessId: businessId,
      },
    });
  }

  async deleteEntry(email: string, businessId: string | number): Promise<any> {
    return this.delete({
      email: email || '-1',
      businessId: businessId || '-1',
    });
  }
  async verifyEntryAndSave(
    email: string,
    businessId: string | number
  ): Promise<boolean | string> {
    const user = await this.findOne({
      where: {
        email: email,
        businessId: businessId,
      },
    });

    if (!user) {
      const newUser = this.create();
      newUser.businessId = businessId;
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
