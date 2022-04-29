import {
  Body,
  Controller, Delete,
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
} from '../../../../../../../../../libs/api/common/decorator';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '@movit/api/auth';
import { GetCompany } from '../../../../../../../../../libs/api/business/src/business.decorator';
import { BusinessEntity } from '../../../../../../../../../libs/api/business/src/entities/business.entity';
import { ProfilesService } from '../../../../../../../../../libs/api/profiles/src/profiles.service';

@Controller(FrontOffice.resolePaths(['crm', FrontOffice.Profiles.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeProfilesController {
  constructor(protected profilesService: ProfilesService) {}

  @Get('segment')
  getSegments(
    @GetCompany() business: BusinessEntity,
    @GetPagination() pagination: Pagination
  ) {
    return this.profilesService.getProfiles(business.businessId, pagination);
  }

  @Get('segment/:segmentId')
  getProfile(
    @GetCompany() business: BusinessEntity,
    @Param('profileId') profileId: number
  ) {
    return this.profilesService.getProfile(business.businessId, profileId);
  }

  @Put('segment')
  createSegment(@GetCompany() business: BusinessEntity, @Body() data:any) {
    return data
  }

  @Patch('segment/:segmentId')
  updateSegment(@GetCompany() business: BusinessEntity,
                @Param('segmentId') segmentId:number,
                @Body() data:any) {
    return data
  }

  @Delete('segment/:segmentId')
  deleteSegment(
    @GetCompany() business: BusinessEntity,
    @Param('segmentId') segmentId: number
  ) {
    return segmentId
  }
}
