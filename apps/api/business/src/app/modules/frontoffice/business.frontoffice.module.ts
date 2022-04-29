import { Module } from '@nestjs/common';
import { BusinessFrontOfficeProfilesModule } from './crm/profiles/business.frontoffice.profiles.module';

@Module({
  imports: [BusinessFrontOfficeProfilesModule],
  controllers: [],
  providers: [],
})
export class BusinessFrontOfficeModule {}
