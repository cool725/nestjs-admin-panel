import { Module } from '@nestjs/common';
import { BusinessFrontOfficeProfilesController } from './business.frontoffice.profiles.controller';
import { ProfilesModule } from '@movit/api/profiles';
import { BusinessFrontOfficeProfilesSegmentsController } from './business.frontoffice.profiles.segments.controller';
import { BusinessFrontofficeProfilesPriceClassController } from './business.frontoffice.profiles.priceclass.controller';

@Module({
  imports: [ProfilesModule],
  controllers: [
    BusinessFrontOfficeProfilesController,
    BusinessFrontofficeProfilesPriceClassController,
    BusinessFrontOfficeProfilesSegmentsController,
  ],
  providers: [],
})
export class BusinessFrontOfficeProfilesModule {}
