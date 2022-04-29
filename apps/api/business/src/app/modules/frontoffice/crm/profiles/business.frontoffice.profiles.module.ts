import { Module } from '@nestjs/common';
import { BusinessFrontOfficeProfilesController } from './business.frontoffice.profiles.controller';
import { ProfilesModule } from '@movit/api/profiles';
import {BusinessFrontOfficeProfilesSegmentsController} from "./business.frontoffice.profiles.segments.controller";
import {BusinessFrontOfficeProfilesPriceClassController} from "./business.frontoffice.profiles.priceClass.controller";

@Module({
  imports: [ProfilesModule],
  controllers: [
    BusinessFrontOfficeProfilesController,
    BusinessFrontOfficeProfilesPriceClassController,
    BusinessFrontOfficeProfilesSegmentsController
  ],
  providers: [],
})
export class BusinessFrontOfficeProfilesModule {}
