import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {ProfilesRepository} from "./classes/profiles.repository";

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesRepository)
    private profileRepo: ProfilesRepository
  ) {}
 r

}
