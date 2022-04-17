import { Module } from '@nestjs/common';
import { BusinessFrontOfficeProfilesController } from './business.frontoffice.profiles.controller';
import {ProfilesModule} from "@movit/api/profiles";

@Module({
  imports: [ProfilesModule],
  controllers: [BusinessFrontOfficeProfilesController],
  providers: [],
})
export class BusinessFrontOfficeProfilesModule {}
