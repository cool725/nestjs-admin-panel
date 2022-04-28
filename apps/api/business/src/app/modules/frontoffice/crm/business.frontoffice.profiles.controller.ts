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
import { GetPagination } from '../../../../../../../../libs/api/common/decorator';
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
    @GetPagination() pagination
  ) {
    
    return this.profilesService.getProfiles(business.businessId,pagination)
    //return pagination;
  }

  @Put('profile')
  saveProfile(
    @GetCompany() business: BusinessEntity,
    @Body() profile: ProfilesDto.Create
  ) {
    return this.profilesService.createProfile(business.businessId, profile);
  }

  @Patch('profile/:profileId')
  updateProfile(
    @GetCompany() business: BusinessEntity,
    @Param('profileId') profileId: number,
    @Body() data: ProfilesDto.Update
  ) {
    return data;
  }

  @Patch('profile/:profileId')
  deleteProfile(
    @GetCompany() business: BusinessEntity,
    @Param('profileId') profileId: number
  ) {
    return 1;
  }
}
