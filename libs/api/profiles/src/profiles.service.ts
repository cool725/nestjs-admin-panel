import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { doTransactionInsert } from '../../common/db/transaction/db.transaction';
import {
  ProfilesPriceClassRepository,
  ProfilesRepository,
  ProfilesSegmentRepository,
} from './classes/profiles.repository';
import { Pagination } from '../../common/decorator';
import { ProfileEntity } from './entities/profile.entity';
import { IsNull } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesRepository)
    private profileRepo: ProfilesRepository,
  ) {
  }

  public getProfiles(businessId: number, pagination: Pagination) {




    return this.profileRepo.find({
      where: { companyId: businessId },
      order: pagination.sort.reduce(
        (order, sort) => ({ ...order, [sort.field]: sort.by }),
        {}
      ),
    //  skip: pagination.skip,
      take: pagination.limit,
    });
  }

  public async getProfile(
    businessId: number,
    profileId: number,
    options: { relations?: string[] } = {}
  ) {
    const profile = await this.profileRepo.findOne({
      where: {
        companyId: businessId,
        profileId: profileId,
      },
    });

    if (!options) return profile;

    if (options.relations?.includes('segments')) {
      profile.segments = await this.profileRepo.getProfileSegments(
        businessId,
        profileId
      );
    }

    return profile;
  }

  async createProfile(businessId: number, data: Partial<ProfileEntity>) {
    const profile = this.profileRepo.create();
    profile.companyId = businessId;
    delete data.id;

    for (const key in data) if (!data[key]) delete data[key];
    Object.assign(profile, data);

    await profile.forceSave();

    await this.profileRepo.saveSegments(
      businessId,
      profile.profileId,
      <any>data.segments
    );
    return profile;
  }

  async updateProfile(businessId, profileId: number, data: any) {
    // todo handle segments | sources ect
    delete data.profileId;
    delete data.businessId;

    const profile = await this.getProfile(businessId, profileId);
    if (!profile) return;

    await this.profileRepo.saveSegments(
      businessId,
      profile.profileId,
      <any>data.segments
    );

    return profile.initialiseData(data).save();
  }

  public deleteProfile(businessId, profileId: number) {
    return this.profileRepo.softDelete({
      companyId: businessId,
      profileId: profileId,
    });
  }
}

@Injectable()
export class ProfilesSegmentService {
  constructor(
    @InjectRepository(ProfilesSegmentRepository)
    private segmentRepo: ProfilesSegmentRepository
  ) {}
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

  public deleteSegment(businessId: number, segmentId: number) {
    return this.segmentRepo.delete({
      companyId: businessId,
      segmentId: segmentId,
    });
  }
}

@Injectable()
export class ProfilesPriceClassService {
  constructor(
    @InjectRepository(ProfilesPriceClassRepository)
    private priceClassRepo: ProfilesPriceClassRepository
  ) {}

  getPriceClasses(businessId: number, pagination: any) {
    return this.priceClassRepo.find({
      where: {
        companyId: businessId,
        deletedAt: IsNull(),
      },
    });
  }

  getPriceClass(businessId: number, priceClassId: number) {
    return this.priceClassRepo.findOne({
      where: {
        companyId: businessId,
        priceClassId: priceClassId,
      },
    });
  }

  savePriceClass(businessId: number, data: any) {
    const priceClass = this.priceClassRepo.create();
    priceClass.companyId = businessId;
    priceClass.title = data.title;
    return priceClass.save();
  }

  async updatePriceClass(businessId: number, priceClassId, data: any) {
    const priceClass = await this.getPriceClass(businessId, priceClassId);
    if (!priceClass) return;

    priceClass.companyId = businessId;
    priceClass.title = data.title;
    return priceClass.save();
  }

  deletePriceClass(businessId, priceClassId) {
    return this.priceClassRepo
      .findOne({
        companyId: businessId,
        priceClassId,
      })
      .then((r) => {
        r.deletedAt = new Date();
        return r.save();
      });
  }
}
