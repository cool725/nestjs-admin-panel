import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ProfilesRepository, ProfilesSegmentRepository} from './classes/profiles.repository';
import { Pagination } from '../../common/decorator';
import { doTransactionInsert } from '../../common/db/transaction/db.transaction';


@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesRepository)
    private profileRepo: ProfilesRepository,


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

@Injectable()
export class ProfilesSegmentService {
  constructor( @InjectRepository(ProfilesSegmentRepository)
               private segmentRepo: ProfilesSegmentRepository) {
  }
  public getSegments(businessId: number, pagination: Pagination) {
    return this.segmentRepo.find({
      where: { companyId: businessId },
      order: pagination.sort.reduce(
          (order, sort) => ({ ...order, [sort.field]: sort.by }),
          {}
      ),
      skip: pagination.skip,
      take: pagination.limit,
    });
  }

  public getSegment(businessId: number, segmentId: number) {
    return this.segmentRepo.findOne({
      where: {
        companyId: businessId,
        profileId: segmentId,
      },
    });
  }

  async createSegment(businessId: number, data: any) {
    const segment = this.segmentRepo.create();
    segment.companyId = businessId;
    await doTransactionInsert(segment, this.segmentRepo);
    return this.updateSegment(businessId, segment.segmentId, data);
  }

  async updateSegment(businessId, profileId: number, data: any) {
    const segment = await this.getSegment(businessId, profileId);
    Object.assign(segment, data);
    return this.segmentRepo.save(segment);
  }

  public deleteSegment(businessId:number, segmentId: number) {
    return this.segmentRepo.delete({
      companyId: businessId,
      segmentId: segmentId,
    });
  }
}
@Injectable()
export class ProfilesPriceClassService {
  constructor( @InjectRepository(ProfilesSegmentRepository)
               private segmentRepo: ProfilesSegmentRepository) {
  }
}