import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  ProfilesPriceClassRepository,
  ProfilesRepository,
  ProfilesSegmentRepository,
} from './classes/profiles.repository';
import { Pagination } from '../../../common/decorator';
import { ProfileEntity } from './entities/profile.entity';
import {IsNull, Like} from 'typeorm';
import { doInsert } from '../../../common/db/utils/db.utils';
import {ProfileSegmentEntity} from "./entities/profile.segment.entity";

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesRepository)
    private profileRepo: ProfilesRepository
  ) {}

  public getProfiles(companyId: number, pagination: Pagination) {
    return pagination.apply(this.profileRepo, companyId);
  }

  public getProfilesPaginated(companyId: number, pagination: Pagination) {
    return pagination.apply(this.profileRepo, companyId);
  }

  public async getProfile(
      companyId: number,
    profileId: number,
    options: { relations?: string[] } = {}
  ) {

    const profile = await this.profileRepo.findOne({
      where: {
        companyId: companyId,
        profileId: profileId,
      }
    });





    if (!options) return profile;

    if (options.relations?.includes('segments')) {
      profile.segments = await this.profileRepo.getProfileSegments(
          companyId, profileId
      );
    }

    return profile;
  }

  async createProfile(companyId: number, data: Partial<ProfileEntity>) {
    const profile = this.profileRepo.create();
    profile.companyId = companyId;
    delete data.id;

    for (const key in data) if (!data[key]) delete data[key];
    Object.assign(profile, data);


    await doInsert(profile);

    await this.profileRepo.saveSegments(
        companyId,
      profile.profileId,
      data.segments as number[]
    );

    return profile;
  }

  async updateProfile(companyId, profileId: number, data: any) {
    // todo handle segments | sources ect
    delete data.profileId;
    delete data.companyId;

    const profile = await this.getProfile(companyId, profileId);
    if (!profile) return;

    await this.profileRepo.saveSegments(
        companyId,
        profile.profileId,
        <any>data.segments
    );

    return profile.initialiseData(data).save();
  }

  public deleteProfile(companyId, profileId: number) {
    return this.profileRepo.softDelete({
      companyId: companyId,
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
  public getSegmentsPaginated(companyId: number, pagination: Pagination) {
    return pagination.apply(this.segmentRepo,companyId);
  }

  public getSegments(companyId: number) {
    return this.segmentRepo.find({
      where:{companyId},
      order: {
        order:'ASC'
      }
    })
  }



  public getSegment(companyId: number, segmentId: number) {
    return this.segmentRepo.findOne({
      where: {
        companyId: companyId,
        segmentId: segmentId,
      },
    });
  }

  async createSegment(companyId: number, data: Partial<ProfileSegmentEntity>) {
    const segment = this.segmentRepo.create();
    segment.companyId = companyId;
    await doInsert(segment);
    return this.updateSegment(companyId, segment.segmentId, data);
  }

  async updateSegment(companyId, segmentId: number, data: any) {
    const segment = await this.getSegment(companyId, segmentId);
    Object.assign(segment, data || {});
    return this.segmentRepo.save(segment);
  }

  public deleteSegment(companyId: number, segmentId: number) {
    return this.segmentRepo.delete({
      companyId: companyId,
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

  getPriceClasses(companyId: number, pagination: any) {
    return this.priceClassRepo.find({
      where: {
        companyId: companyId,
        deletedAt: IsNull(),
      },
    });
  }

  getPriceClass(companyId: number, priceClassId: number) {
    return this.priceClassRepo.findOne({
      where: {
        companyId: companyId,
        priceClassId: priceClassId,
      },
    });
  }

  savePriceClass(companyId: number, data: any) {
    const priceClass = this.priceClassRepo.create();
    priceClass.companyId = companyId;
    priceClass.title = data.title;
    priceClass.color = data.color;
    priceClass.isDefault = data.isDefault;
    priceClass.value = data.value;
    priceClass.reduceType = data.reduceType;
    return priceClass.save();
  }

  async updatePriceClass(companyId: number, priceClassId, data: any) {
    const priceClass = await this.getPriceClass(companyId, priceClassId);
    if (!priceClass) return;

    priceClass.companyId = companyId;
    priceClass.title = data.title;
    return priceClass.save();
  }

  deletePriceClass(companyId, priceClassId) {
    return this.priceClassRepo
      .findOne({
        companyId: companyId,
        priceClassId,
      })
      .then((r) => {
        r.deletedAt = new Date();
        return r.save();
      });
  }
}
