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
} from '../../../../../../../../../libs/api/common/decorator';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '@movit/api/auth';
import { GetCompany } from '../../../../../../../../../libs/api/business/src/business.decorator';
import { BusinessEntity } from '../../../../../../../../../libs/api/business/src/entities/business.entity';
import { ProfilesSegmentService, ProfilesService } from '@movit/api/profiles';

@Controller(FrontOffice.resolePaths(['crm', FrontOffice.Profiles.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeProfilesSegmentsController {
  constructor(
    protected profilesService: ProfilesService,
    protected segmentService: ProfilesSegmentService
  ) {}

  @Get('segment')
  getSegments(
    @GetCompany() business: BusinessEntity,
    @GetPagination() pagination: Pagination
  ) {
    return this.segmentService.getSegments(business.businessId, pagination);
  }

  @Get('segment/:segmentId')
  getSegment(
    @GetCompany() business: BusinessEntity,
    @Param('segmentId') segmentId: number
  ) {
    return this.segmentService.getSegment(business.businessId, segmentId);
  }

  @Put('segment')
  createSegment(@GetCompany() business: BusinessEntity, @Body() data: any) {
    return this.segmentService.createSegment(business.businessId, data);
  }

  @Patch('segment/:segmentId')
  updateSegment(
    @GetCompany() business: BusinessEntity,
    @Param('segmentId') segmentId: number,
    @Body() data: any
  ) {
    return this.segmentService.updateSegment(
      business.businessId,
      segmentId,
      data
    );
  }

  @Delete('segment/:segmentId')
  deleteSegment(
    @GetCompany() business: BusinessEntity,
    @Param('segmentId') segmentId: number
  ) {
    if (segmentId)
      return this.segmentService.deleteSegment(business.businessId, segmentId);
  }
}
