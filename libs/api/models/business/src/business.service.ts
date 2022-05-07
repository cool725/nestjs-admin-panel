import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessRepository } from './classes/business.repository';
import { BusinessEntity } from './entities/business.entity';
import { BusinessUserRolesEntity } from './entities/business.users.roles.entity.app';
import { AuthUser } from '@movit/api/auth';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(BusinessRepository)
    private businessRepo: BusinessRepository
  ) {}

  /**
   * List Business
   * todo rename listAllowedBusinessFromUser
   * */
  public list(
    authUser,
    options: Partial<BusinessEntity>
  ): Promise<BusinessEntity[]> {
    return this.businessRepo.listBusiness(authUser, options);
  }

  // rename signUserInToCompany
  public findUserBusinessRole(authUser, uuId): Promise<BusinessEntity> {
    return this.businessRepo.getCompanyByUuIdWithVerification(authUser, uuId);
  }

  public async signUserByInvitationCode(
    authUser,
    invitationCode
  ): Promise<BusinessEntity> {
    const invitation = await this.businessRepo.getCompanyByInvitationCode(
      invitationCode
    );
    if (!invitation || invitation.email != authUser.email)
      throw 'invitation is not valid';
    const business = await this.businessRepo.findOne({
      where: {
        businessId: invitation.businessId,
      },
    });

    const newRole = new BusinessUserRolesEntity();
    newRole.user = authUser;
    newRole.roles = 'user';
    newRole.business = business;
    await newRole.save();

    return this.findUserBusinessRole(authUser, business.businessUuId);
  }

  getBusinessRoles(business: BusinessEntity) {
    return this.businessRepo.getBusinessRoles(business);
  }

  getBusinessUsers(business: BusinessEntity) {
    return this.businessRepo.getBusinessUsers(business);
  }
  getBusinessUser(business: BusinessEntity, userId: string, details = {}) {
    const user = this.businessRepo.getBusinessUser(business, userId);
    return user;
  }
  updateBusinessUser(business: BusinessEntity, user: string) {
    return this.businessRepo.updateBusinessUser(business, user);
  }
  addUserToBusinessRole(business: BusinessEntity, user: AuthUser) {
    return this.businessRepo.addUserToBusinessRole(business, user);
  }
  deleteBusinessUser(business: BusinessEntity, user: string) {
    return this.businessRepo.deleteBusinessUser(business, user);
  }
  createBusiness() {
    // create new business COM_ entry
    // create com_user_role
    // create app_role with business scope
    // assign user
  }
}
