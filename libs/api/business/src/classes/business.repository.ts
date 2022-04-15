import { EntityRepository, IsNull, Repository } from 'typeorm';
import { BusinessEntity } from '../entities/business.entity';
import { BusinessUserRolesEntity } from '../entities/business.users.roles.entity.app';
import { AuthUser } from '@movit/api/auth';

@EntityRepository(BusinessEntity)
export class BusinessRepository extends Repository<BusinessEntity> {
  constructor() {
    super();
  }

  async listBusiness(user, options): Promise<BusinessEntity[]> {
    const { userId, authCreatedAt } = user;

    const userBusinesses = await BusinessUserRolesEntity.find({
      where: {
        userCreatedAt: authCreatedAt,
        user: {
          userId: userId,
        },
      },
    });

    return userBusinesses ? userBusinesses.map((b) => b.business) : [];
  }

  // get company
  async getCompanyByUuIdWithVerification(
    user,
    uuId: string
  ): Promise<BusinessEntity | null> {
    const { userId, authCreatedAt } = user;
    const roles = await BusinessUserRolesEntity.find({
      where: {
        userCreatedAt: authCreatedAt,
        user: {
          userId: userId,
        },
      },
    });
    const role = roles.find((roles) => roles.business.businessUuId == uuId);
    return role ? role.business : null;
  }

  async getCompanyByInvitationCode(
    invitationCode: string
  ): Promise<{ invitationCode: string; email: string; businessId: string }> {
    return this.manager.query(
      `SELECT * FROM auth_user_invited where updatedAt > DATE_ADD(CURDATE(), INTERVAL -2 DAY) and invitationId = ? limit 1`,
      [invitationCode]
    );
  }

  async getBusinessRoles(business: BusinessEntity) {
    const userBusinesses = await BusinessUserRolesEntity.find({
      where: {
        business: business,
      },
    });
    return userBusinesses;
  }
  async getBusinessUsers(business: BusinessEntity) {
    const userBusinesses = await BusinessUserRolesEntity.find({
      where: {
        business: business,
      },
      relations: ['user'],
    });
    return userBusinesses.map((roles) => roles.user.toJSON());
  }
  async getBusinessUser(
    business: BusinessEntity,
    userId
  ): Promise<AuthUser | null> {
    const userBusinesses = await BusinessUserRolesEntity.findOne({
      where: {
        business: business,
        user: { userId },
      },
      relations: ['user'],
    });
    return userBusinesses ? userBusinesses.user : null;
  }

  async addUserToBusinessRole(business: BusinessEntity, authUser: AuthUser) {
    const userRoleBusiness: BusinessUserRolesEntity =
      await BusinessUserRolesEntity.create();
    userRoleBusiness.roles = 'user';
    userRoleBusiness.user = authUser;
    userRoleBusiness.userCreatedAt = authUser.authCreatedAt;
    userRoleBusiness.business = business;
    return userRoleBusiness.save();
  }

  async updateBusinessUser(business: BusinessEntity, user) {
    const userBusinesses = await BusinessUserRolesEntity.findOne({
      where: {
        business: business,
        user: { userId: user.userId },
      },
      relations: ['user'],
    });

    if (userBusinesses && userBusinesses.user) {
      await userBusinesses.user.initialise(user, false).save();
    }

    return { userId: userBusinesses.user.userId };
  }

  deleteBusinessUser(business: BusinessEntity, uuId) {}
}
