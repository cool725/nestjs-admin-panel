import { EntityRepository, Repository } from 'typeorm';
import { CompanyEntity } from '../entities/companyEntity';
import { BusinessUserRolesEntity } from '../entities/business.users.roles.entity.app';
import { AuthUserEntity } from '@movit/api/auth';
import {Company} from "@movit/api/business";

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {
  constructor() {
    super();
  }

  async listAllowedBusinessFromUser(user, options): Promise<CompanyEntity[]> {
    const { userId, authCreatedAt } = user;

    const userBusinesses = await BusinessUserRolesEntity.find({
      where: {
        userCreatedAt: authCreatedAt,
        user: {
          userId: userId,
        },
      },
    });

    return userBusinesses ? userBusinesses.map((b) => b.company) : [];
  }

  // get company
  async getCompanyByUuIdWithVerification(
    user,
    uuId: string
  ): Promise<CompanyEntity | null> {
    const { userId, authCreatedAt } = user;
    const roles = await BusinessUserRolesEntity.find({
      where: {
        userCreatedAt: authCreatedAt,
        user: {
          userId: userId,
        },
      },
    });
    const role = roles.find((roles) => roles.company.businessUuId == uuId);
    return role ? role.company : null;
  }

  async getCompanyByInvitationCode(
    invitationCode: string
  ): Promise<{ invitationCode: string; email: string; companyId: string }> {
    return this.manager.query(
      `SELECT * FROM auth_user_invited where updatedAt > DATE_ADD(CURDATE(), INTERVAL -2 DAY) and invitationId = ? limit 1`,
      [invitationCode]
    );
  }

  async getAllowedBusinessListFromUser(user) {
    const userBusinesses = await BusinessUserRolesEntity.find({
      where: {
        user: user,
      },
    });
    return userBusinesses.map((v) => v.company);
  }

  async getLinkedBusinessList(user) {
    return [];
  }

  async getBusinessRoles(company: Company) {
    const userBusinesses = await BusinessUserRolesEntity.find({
      where: {
        business: company,
      },
    });
    return userBusinesses;
  }
  async getBusinessUsers(business: CompanyEntity) {
    const userBusinesses = await BusinessUserRolesEntity.find({
      where: {
        business: business,
      },
      relations: ['user'],
    });
    return userBusinesses.map((roles) => roles.user.toJSON());
  }
  async getBusinessUser(
    business: CompanyEntity,
    userId
  ): Promise<AuthUserEntity | null> {
    const userBusinesses = await BusinessUserRolesEntity.findOne({
      where: {
        business: business,
        user: { userId },
      },
      relations: ['user'],
    });
    return userBusinesses ? userBusinesses.user : null;
  }

  async addUserToBusinessRole(business: CompanyEntity, authUser: AuthUserEntity) {
    const userRoleBusiness: BusinessUserRolesEntity =
      await BusinessUserRolesEntity.create();
    userRoleBusiness.roles = 'user';
    userRoleBusiness.user = authUser;
    userRoleBusiness.userCreatedAt = authUser.authCreatedAt;
    userRoleBusiness.company = business;
    return userRoleBusiness.save();
  }

  async updateBusinessUser(business: CompanyEntity, user) {
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

  deleteBusinessUser(business: CompanyEntity, uuId) {}
}
