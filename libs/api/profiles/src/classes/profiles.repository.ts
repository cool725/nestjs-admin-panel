import { EntityRepository, Repository } from 'typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import {ProfileSegmentEntity} from "../entities/profile.segment.entity";
import {ProfileSegmentRelationEntity} from "../entities/profile.segment.relation.entity";

@EntityRepository(ProfileEntity)
export class ProfilesRepository extends Repository<ProfileEntity> {
  constructor() {
    super();
  }

  async getProfileSegments(businessId:number,profileId:number)
  {
   const segments = await ProfileSegmentRelationEntity.find(
       {
         where:{
           companyId:businessId,
           profileId:profileId
         }
       }
   )
   return segments.map((segment)=> (segment.segmentId))
  }

  async saveSegments(businessId:number,profileId:number,segmentIds:number[]){
    await ProfileSegmentRelationEntity.delete({companyId:businessId, profileId:profileId});
    return Promise.all(segmentIds.map( id =>
    {
      const relation = ProfileSegmentRelationEntity.create();
      relation.profileId = profileId;
      relation.segmentId = id;
      relation.companyId = businessId;
      return relation.save()
    }))
  }
}

@EntityRepository(ProfileSegmentEntity)
export class ProfilesSegmentRepository extends Repository<ProfileSegmentEntity> {
  constructor() {
    super();
  }
}