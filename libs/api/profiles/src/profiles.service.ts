import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesRepository } from './classes/profiles.repository';
import { Pagination } from '../../common/decorator';
import { doTransactionInsert } from '../../common/db/transaction/db.transaction';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesRepository)
    private profileRepo: ProfilesRepository
  ) {}


  public getProfiles(businessId: number, pagination: Pagination) {
    return this.profileRepo.find({
      where: { companyId: businessId },
      order: pagination.sort.reduce(
        (order, sort) => ({ ...order, [sort.field]: sort.by }),
        {}
      ),
      skip: pagination.skip,
      take: pagination.limit,
    });
  }

  public getProfile(businessId: number, profileId: number) {
    return this.profileRepo.findOne({
      where: {
        companyId: businessId,
        profileId: profileId,
      },
    });
  }

  async createProfile(businessId: number, data: any) {
    const profile = this.profileRepo.create();
    profile.companyId = businessId;
    await doTransactionInsert(profile, this.profileRepo);
    return this.updateProfile(businessId, profile.profileId, data);
  }

  async updateProfile(businessId, profileId: number, data: any) {
    const profile = await this.getProfile(businessId, profileId);
    Object.assign(profile, data);
    return this.profileRepo.save(profile);
  }

  public deleteProfile(businessId, profileId: number) {
    return this.profileRepo.delete({
      companyId: businessId,
      profileId: profileId,
    });
  }
}
