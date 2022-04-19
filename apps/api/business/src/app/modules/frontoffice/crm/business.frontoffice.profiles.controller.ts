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

@Controller(FrontOffice.resolePath(FrontOffice.Profiles.PATH))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeProfilesController {

  constructor(
    private profilesService: ProfilesService
  ) { }

  @Get()
  getProfiles(
    @GetPagination() pagination: Pagination
  ) {
    return this.profilesService.getProfiles(pagination);
  }

  @Get(':profileId')
  getUser(
    @Param('profileId') profileId: number
  ) {
    return this.profilesService.getProfile(profileId);
  }

  @Post()
  createProfile(
    @Body() body: any
  ) {
    return this.profilesService.createProfile(body);
  }

  @Patch(':profileId')
  updateProfile(
    @Param('profileId') profileId: number,
    @Body() body: any
  ) {
    return this.profilesService.updateProfile(profileId, body);
  }

  @Delete(':profileId')
  deleteProfile(
    @Param('profileId') profileId: number
  ) {
    return this.profilesService.deleteProfile(profileId);
  }
}
