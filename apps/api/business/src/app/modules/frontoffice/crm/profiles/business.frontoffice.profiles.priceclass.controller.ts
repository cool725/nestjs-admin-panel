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
import {
  ProfilesPriceClassService,
  ProfilesService,
} from '@movit/api/profiles';

@Controller(FrontOffice.resolePaths(['crm', FrontOffice.Profiles.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontofficeProfilesPriceClassController {
  constructor(
    protected profilesService: ProfilesService,
    protected priceClassService: ProfilesPriceClassService
  ) {}

  @Get('priceclass')
  getPriceClasses(
    @GetCompany() business: BusinessEntity,
    @GetPagination() pagination: Pagination
  ) {
    return this.priceClassService.getPriceClasses(
      business.businessId,
      pagination
    );
  }

  @Get('priceclass/:priceClassId')
  getPriceClass(
    @GetCompany() business: BusinessEntity,
    @Param('priceClassId') priceClassId: number
  ) {
    return this.priceClassService.getPriceClass(
      business.businessId,
      priceClassId
    );
  }

  @Put('priceclass')
  createPriceClass(@GetCompany() business: BusinessEntity, @Body() data: any) {
    return this.priceClassService.savePriceClass(business.businessId, data);
  }

  @Patch('priceclass/:priceClassId')
  updatePriceClass(
    @GetCompany() business: BusinessEntity,
    @Param('priceClassId') priceClassId: number,
    @Body() data: any
  ) {
    return this.priceClassService.updatePriceClass(
      business.businessId,
      priceClassId,
      data
    );
  }

  @Delete('priceclass/:priceClassId')
  deletePriceClassId(
    @GetCompany() business: BusinessEntity,
    @Param('priceClassId') priceClassId: number
  ) {
    return this.priceClassService.deletePriceClass(
      business.businessId,
      priceClassId
    );
  }
}
