import { EntityRepository, Repository } from 'typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import {ProfileSegmentEntity} from "../entities/profile.segment.entity";

@EntityRepository(ProfileEntity)
export class ProfilesRepository extends Repository<ProfileEntity> {
  constructor() {
    super();
  }
}

@EntityRepository(ProfileSegmentEntity)
export class ProfilesSegmentRepository extends Repository<ProfileSegmentEntity> {
  constructor() {
    super();
  }
}