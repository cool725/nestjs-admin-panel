import { EntityRepository, Repository } from 'typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import { ProfileSegmentEntity } from '../entities/profile.segment.entity';
import { ProfileSegmentRelationEntity } from '../entities/profile.segment.relation.entity';
import { ProfilePriceClassEntity } from '../entities/profile.priceclass.entity';

@EntityRepository(ProfileEntity)
export class ProfilesRepository extends Repository<ProfileEntity> {
  constructor() {
    super();
  }

  async getProfileSegments(companyId: number, profileId: number) {
    const segments = await ProfileSegmentRelationEntity.find({
      where: {
        companyId: companyId,
        profileId: profileId,
      },
    });
    return segments.map((segment) => segment.segmentId);
  }

  async saveSegments(
      companyId: number,
    profileId: number,
    segmentIds: number[]
  ) {
    await ProfileSegmentRelationEntity.delete({
      companyId: companyId,
      profileId: profileId,
    });
    return Promise.all(
      segmentIds.map((id) => {
        const relation = ProfileSegmentRelationEntity.create();
        relation.profileId = profileId;
        relation.segmentId = id;
        relation.companyId = companyId;
        return relation.save();
      })
    );
  }
}

@EntityRepository(ProfileSegmentEntity)
export class ProfilesSegmentRepository extends Repository<ProfileSegmentEntity> {
  constructor() {
    super();
  }
}
@EntityRepository(ProfilePriceClassEntity)
export class ProfilesPriceClassRepository extends Repository<ProfilePriceClassEntity> {
  constructor() {
    super();
  }
}
