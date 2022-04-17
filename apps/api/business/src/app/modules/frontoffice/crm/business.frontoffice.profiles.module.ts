import { Module } from '@nestjs/common';
import { BusinessFrontOfficeProfilesController } from './business.frontoffice.profiles.controller';

@Module({
  imports: [],
  controllers: [BusinessFrontOfficeProfilesController],
  providers: [],
})
export class BusinessFrontOfficeProfilesModule {}
