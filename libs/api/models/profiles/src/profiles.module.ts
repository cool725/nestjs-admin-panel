import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ProfilesPriceClassRepository,
  ProfilesRepository,
  ProfilesSegmentRepository,
} from './classes/profiles.repository';
import ProfilesDBOptions from './db/profiles.database';
import {
  ProfilesPriceClassService,
  ProfilesSegmentService,
  ProfilesService,
} from './profiles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfilesRepository,
      ProfilesSegmentRepository,
      ProfilesPriceClassRepository,
    ]),
  ],
  providers: [
    ProfilesService,
    ProfilesSegmentService,
    ProfilesPriceClassService,
  ],
  controllers: [],
  exports: [ProfilesService, ProfilesSegmentService, ProfilesPriceClassService],
})
export class ProfilesModule {
  static dbSettings = ProfilesDBOptions;
}
