import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesRepository } from "./classes/profiles.repository";
import { Pagination } from '../../common/decorator';

//TODO   //  where companyId to all requests
@Injectable()
export class ProfilesService {

  constructor(
    @InjectRepository(ProfilesRepository)
    private profileRepo: ProfilesRepository
  ) { }


  getProfiles(pagination: Pagination) {
    return this.profileRepo.find({
      order: pagination.sort.reduce((order, sort) => ({ ...order, [sort.field]: sort.by }), {}),
      skip: pagination.skip,
      take: pagination.limit
    })
  }

  getProfile(id: number) {
    return this.profileRepo.findOne(id);
  }

  createProfile(data: any) {
    return this.profileRepo.insert(data);
  }

  updateProfile(id: number, data: any) {
    return this.profileRepo.update(id, data);
  }

  deleteProfile(id: number) {
    return this.profileRepo.delete(id);
  }
}
