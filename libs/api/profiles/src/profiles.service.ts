import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ProfilesRepository, ProfilesSegmentRepository} from './classes/profiles.repository';
import { Pagination } from '../../common/decorator';
import { doTransactionInsert } from '../../common/db/transaction/db.transaction';
import {ProfileEntity} from "./entities/profile.entity";


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

  async createProfile(businessId: number, data: Partial<ProfileEntity>) {
    const profile = this.profileRepo.create();
    profile.companyId = businessId;
    Object.assign(profile, data);
    return this.profileRepo.save(profile)
  }

  async updateProfile(businessId, profileId: number, data: any) {
    // todo handle segments | sources ect
    return this.profileRepo.update({
      companyId:businessId,
      profileId:profileId
    }, data);
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
        segmentId: segmentId,
      },
    });
  }

  async createSegment(businessId: number, data: any) {
    const segment = this.segmentRepo.create();
    segment.companyId = businessId;
    await doTransactionInsert(segment, this.segmentRepo);
    return this.updateSegment(businessId, segment.segmentId, data);
  }

  async updateSegment(businessId, segmentId: number, data: any) {
    const segment = await this.getSegment(businessId, segmentId);
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