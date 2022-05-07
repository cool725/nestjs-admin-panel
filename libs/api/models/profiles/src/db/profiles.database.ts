import { ConnectionOptions } from 'typeorm';
import { doSeed } from '../../../../common/db/seed';
import { ProfileEntity } from '../entities/profile.entity';
import { ProfileSegmentEntity } from '../entities/profile.segment.entity';
import { ProfileSourceEntity } from '../entities/profile.source.entity';
import { ProfileSegmentRelationEntity } from '../entities/profile.segment.relation.entity';
import { ProfilePriceClassEntity } from '../entities/profile.priceclass.entity';

const ProfilesDBOptions = <ConnectionOptions>{
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 0),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  migrationsRun: true,
  logger: 'file',
  entities: [
    ProfileEntity,
    ProfileSegmentEntity,
    ProfileSegmentRelationEntity,
    ProfileSourceEntity,
    ProfilePriceClassEntity,
  ],
};

doSeed([], ProfilesDBOptions);

export default ProfilesDBOptions;
