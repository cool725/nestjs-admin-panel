import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FrontOffice } from '../business.frontoffice.namespace';
import {
  GetPagination,
  Pagination,
} from '../../../../../../../../libs/api/common/decorator';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '@movit/api/auth';
import { GetCompany } from '../../../../../../../../libs/api/business/src/business.decorator';
import { BusinessEntity } from '../../../../../../../../libs/api/business/src/entities/business.entity';
import { ProfilesService } from '../../../../../../../../libs/api/profiles/src/profiles.service';
import { ProfilesDto } from '../../../../../../../../libs/api/profiles/src/classes/profiles.dto';

@Controller(FrontOffice.resolePaths(['crm', FrontOffice.Profiles.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeProfilesController {
  constructor(protected profilesService: ProfilesService) {}

  @Get('profile')
  getProfiles(
    @GetCompany() business: BusinessEntity,
    @GetPagination() pagination: Pagination
  ) {
    return this.profilesService.getProfiles(business.businessId, pagination);
  }

  @Put('profile/:profileId')
  getProfile(
    @GetCompany() business: BusinessEntity,
    @Param('profileId') profileId: number
  ) {
    return this.profilesService.getProfile(business.businessId, profileId);
  }

  @Put('profile')
  createProfile(@GetCompany() business: BusinessEntity, @Body() profile:ProfilesDto.Create) {
    return this.profilesService.createProfile(business.businessId, profile);
  }

  @Patch('profile/:profileId')
  updateProfile(
    @GetCompany() business: BusinessEntity,
    @Param('profileId') profileId: number,
    @Body() profile:ProfilesDto.Update
  ) {
    return this.profilesService.updateProfile(
      business.businessId,
      profileId,
      profile
    );
  }

  @Patch('profile/:profileId')
  deleteProfile(
    @GetCompany() business: BusinessEntity,
    @Param('profileId') profileId: number
  ) {
    return this.profilesService.deleteProfile(business.businessId, profileId);
  }
}
