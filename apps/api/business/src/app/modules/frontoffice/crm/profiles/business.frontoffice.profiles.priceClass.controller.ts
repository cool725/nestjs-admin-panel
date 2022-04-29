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

  @Get('priceclass')
  getPriceClasses(
    @GetCompany() business: BusinessEntity,
    @GetPagination() pagination: Pagination
  ) {
    return [];
  }

  @Get('priceclass/:priceClassId')
  getProfile(
    @GetCompany() business: BusinessEntity,
    @Param('priceClassId') priceClassId: number
  ) {
    return priceClassId
  }

  @Put('priceclass')
  createPriceClass(@GetCompany() business: BusinessEntity, @Body() data:any) {
    return data
  }

  @Patch('priceclass/:priceClassId')
  updatePriceClass(@GetCompany() business: BusinessEntity,
                @Param('priceClassId') segmentId:number,
                @Body() data:any) {
    return data
  }

  @Delete('priceclass/:priceClassId')
  deletePriceClassId(
    @GetCompany() business: BusinessEntity,
    @Param('segmentId') segmentId: number
  ) {
    return segmentId
  }
}
