import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FrontOffice } from '../../business.frontoffice.namespace';
import {
  GetPagination,
  Pagination,
} from '../../../../../../../../../../libs/api/common/decorator';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '@movit/api/auth';
import { GetCompany } from '@movit/api/business';
import { CompanyEntity } from '../../../../../../../../../../libs/api/models/company/src/entities/companyEntity';
import { ProfilesService } from '@movit/api/profiles';
import { ProfilesDto } from '../../../../../../../../../../libs/api/models/profiles/src/classes/profiles.dto';

@Controller(FrontOffice.resolePaths(['crm', FrontOffice.Profiles.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeProfilesController {
  constructor(protected profilesService: ProfilesService) {}

  @Get('profile')
  getProfiles(
    @GetCompany() business: CompanyEntity,
    @GetPagination() pagination: Pagination
  ) {
    return this.profilesService.getProfiles(business.companyId, pagination);
  }

  @Get('profile/:profileId')
  getProfile(
    @GetCompany() business: CompanyEntity,
    @Param('profileId') profileId: number
  ) {
    return this.profilesService.getProfile(business.companyId, profileId, {
      relations: ['segments','priceClassId'],
    });
  }

  @Put('profile')
  createProfile(
    @GetCompany() business: CompanyEntity,
    @Body() profile: ProfilesDto.Create
  ) {
    return this.profilesService.createProfile(business.companyId, profile);
  }

  @Patch('profile/:profileId')
  updateProfile(
    @GetCompany() business: CompanyEntity,
    @Param('profileId') profileId: any,
    @Body() profile: ProfilesDto.Update
  ) {
    return this.profilesService.updateProfile(
      business.companyId,
      profileId,
      profile
    );
  }

  @Delete('profile/:profileId')
  deleteProfile(
    @GetCompany() business: CompanyEntity,
    @Param('profileId') profileId: number
  ) {
    return this.profilesService.deleteProfile(business.companyId, profileId);
  }
}
