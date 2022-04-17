import { EntityRepository, IsNull, Repository } from 'typeorm';
import {ProfileEntity} from "../entities/profles.entity";

@EntityRepository(ProfileEntity)
export class ProfilesRepository extends Repository<ProfileEntity> {
  constructor() {
    super();
  }

}
