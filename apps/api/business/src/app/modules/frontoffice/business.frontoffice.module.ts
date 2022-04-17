import { Module } from '@nestjs/common';
import {BusinessFrontOfficeProfilesModule} from "./crm/business.frontoffice.profiles.module";

@Module({
  imports: [
    BusinessFrontOfficeProfilesModule
  ],
  controllers: [],
  providers: [],
})
export class BusinessFrontOfficeModule {}
