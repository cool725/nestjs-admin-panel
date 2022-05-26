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
import { GetCompany } from '../../../../../../../../../../libs/api/models/company/src/company.decorator';
import { CompanyEntity } from '../../../../../../../../../../libs/api/models/company/src/entities/companyEntity';
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

  @Get('price-class')
  getPriceClasses(
    @GetCompany() business: CompanyEntity,
    @GetPagination() pagination: Pagination
  ) {
    return this.priceClassService.getPriceClasses(
      business.companyId,
      pagination
    );
  }

  @Get('price-class/:priceClassId')
  getPriceClass(
    @GetCompany() business: CompanyEntity,
    @Param('priceClassId') priceClassId: number
  ) {
    return this.priceClassService.getPriceClass(
      business.companyId,
      priceClassId
    );
  }

  @Put('price-class')
  createPriceClass(@GetCompany() business: CompanyEntity, @Body() data: any) {
    return this.priceClassService.savePriceClass(business.companyId, data);
  }

  @Patch('price-class/:priceClassId')
  updatePriceClass(
    @GetCompany() business: CompanyEntity,
    @Param('priceClassId') priceClassId: number,
    @Body() data: any
  ) {
    return this.priceClassService.updatePriceClass(
      business.companyId,
      priceClassId,
      data
    );
  }

  @Delete('price-class/:priceClassId')
  deletePriceClassId(
    @GetCompany() business: CompanyEntity,
    @Param('priceClassId') priceClassId: number
  ) {
    return this.priceClassService.deletePriceClass(
      business.companyId,
      priceClassId
    );
  }
}
