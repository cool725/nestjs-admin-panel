import { EntityRepository, Repository } from 'typeorm';
import {ProfileEntity} from "../entities/profile.entity";

@EntityRepository(ProfileEntity)
export class ProfilesRepository extends Repository<ProfileEntity> {



}
