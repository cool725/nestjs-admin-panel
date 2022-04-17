import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";


import {ProfilesRepository} from "./classes/profiles.repository";
import ProfilesDBOptions from "./db/profiles.database";
import {ProfilesService} from "./profiles.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProfilesRepository])],
  providers: [ProfilesService],
  controllers: [],
  exports: [ProfilesService],
})
export class ProfilesModule {
  static dbSettings = ProfilesDBOptions;
}
