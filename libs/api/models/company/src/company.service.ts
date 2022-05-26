import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from './classes/company.repository';
import { CompanyEntity } from './entities/companyEntity';
import { BusinessUserRolesEntity } from './entities/business.users.roles.entity.app';
import { AuthUserEntity } from '@movit/api/auth';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private companyRepo: CompanyRepository
  ) {}

  /**
   * List Business
   * */
  public listAllowedBusinessFromUser(
    authUser,
    options: Partial<CompanyEntity>
  ): Promise<CompanyEntity[]> {
    return this.companyRepo.listAllowedBusinessFromUser(authUser, options);
  }

  // rename signUserInToCompany
  public findUserBusinessRole(authUser, uuId): Promise<CompanyEntity> {
    return this.companyRepo.getCompanyByUuIdWithVerification(authUser, uuId);
  }

  // todo rename
  public async signUserByInvitationCode(
    authUser,
    invitationCode
  ): Promise<CompanyEntity> {

    const invitation = await this.companyRepo.getCompanyByInvitationCode(
      invitationCode
    );
    if (!invitation || invitation.email != authUser.email) throw 'invitation is not valid';

    const company = await this.companyRepo.findOne({
      where: {
        companyId: invitation.companyId,
      },
    });

    // Save user-company link
    const newRole = new BusinessUserRolesEntity();
    newRole.user = authUser;
    newRole.company = company;
    newRole.roles = 'user';
    await newRole.save();

    // verify and reload data
    return this.findUserBusinessRole(authUser, company.businessUuId);
  }

  getBusinessRoles(business: CompanyEntity) {
    return this.companyRepo.getBusinessRoles(business);
  }

  getBusinessUsers(business: CompanyEntity) {
    return this.companyRepo.getBusinessUsers(business);
  }

  /*
   * Loads user that is assigned to company
   * */
  getBusinessUser(business: CompanyEntity, userId: string, details = {}) {
    return  this.companyRepo.getBusinessUser(business, userId);
  }
  updateBusinessUser(business: CompanyEntity, user: string) {
    return this.companyRepo.updateBusinessUser(business, user);
  }
  addUserToBusinessRole(business: CompanyEntity, user: AuthUserEntity) {
    return this.companyRepo.addUserToBusinessRole(business, user);
  }
  deleteBusinessUser(business: CompanyEntity, user: string) {
    return this.companyRepo.deleteBusinessUser(business, user);
  }
  createBusiness() {
    // create new business COM_ entry
    // create com_user_role
    // create app_role with business scope
    // assign user
  }

  /**
   * Return all Business/organisation where user has rights
   * */
  getAllowedBusinessListFromUser(user) {
    return this.companyRepo.getAllowedBusinessListFromUser(user);
  }

  getLinkedBusinessList(business) {
    return this.companyRepo.getLinkedBusinessList(business);
  }
}
