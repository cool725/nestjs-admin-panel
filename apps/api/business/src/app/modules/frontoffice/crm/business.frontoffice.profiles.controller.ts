import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FrontOffice } from '../business.frontoffice.namespace';
import { GetPagination, Pagination } from '../../../../../../../../libs/api/common/decorator';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '@movit/api/auth';
import {ProfilesService} from "../../../../../../../../libs/api/profiles/src/profiles.service";
import {BusinessEntity} from "../../../../../../../../libs/api/business/src/entities/business.entity";
import {GetCompany} from "../../../../../../../../libs/api/business/src/business.decorator";

@Controller(FrontOffice.resolePath(FrontOffice.Profiles.PATH))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeProfilesController {

  constructor(
    private profilesService: ProfilesService
  ) { }

  @Get()
  getProfiles(
    @GetCompany() business:BusinessEntity,
    @GetPagination() pagination: Pagination
  ) {
    return this.profilesService.getProfiles(pagination);
  }

  @Get(':profileId')
  getProfile(
      @GetCompany() business:BusinessEntity,
      @Param('profileId') profileId: number
  ) {
    return this.profilesService.getProfile(business.businessId,profileId);
  }

  @Patch()
  createProfile(
    @GetCompany() business:BusinessEntity,
    @Body() body: any,
  ) {
    return this.profilesService.createProfile(business.businessId,body);
  }

  @Patch(':profileId')
  updateProfile(
    @GetCompany() business: BusinessEntity,
    @Param('profileId') profileId: number
  ) {
    return this.profilesService.updateProfile(business.businessId,profileId,body);
  }

  @Delete(':profileId')
  deleteProfile(
    @GetCompany() business: BusinessEntity,
    @Param('profileId') profileId: number
  ) {
    return this.profilesService.deleteProfile(business.businessId,profileId);
  }
}
