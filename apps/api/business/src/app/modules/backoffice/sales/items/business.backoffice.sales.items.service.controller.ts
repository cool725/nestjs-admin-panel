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
import { BackOffice } from '../../business.backoffice.namespace';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '@movit/api/auth';
import { GetPagination } from '../../../../../../../../../libs/api/common/decorator';
import { GetLanguage } from '../../../../../../../../../libs/api/common/decorator/decorator.language';
import {AppsRolesGuard} from "../../../../../../../../../libs/api/models/apps-role/src/app/guards/auth.guards.apps";
import {SalesItemService} from "../../../../../../../../../libs/api/models/sales/item/src/lib/sales-item-service";
import {BusinessEntity} from "../../../../../../../../../libs/api/models/business/src/entities/business.entity";
import {GetCompany} from "../../../../../../../../../libs/api/models/business/src/business.decorator";

@Controller(BackOffice.resolePath(BackOffice.Sales.Items.PATHService))
@UseGuards(AuthGuard(), CompanyGuard, AppsRolesGuard(14))
export class BusinessBackOfficeSalesItemsServiceController {
  constructor(private itemService: SalesItemService) {}

  @Get('/')
  async getServices(
    @GetCompany() business: BusinessEntity,
    @GetLanguage() langId,
    @GetPagination() paginate
  ) {
    return this.itemService.getServices(business.businessId, langId, paginate);
  }

  @Get('/category')
  async getCategories(
    @GetCompany() business: BusinessEntity,
    @Param() service,
    @GetLanguage() langId,
    @GetPagination() pagination
  ) {
    return this.itemService.getServiceCategories(business.businessId, langId, {
      ...pagination,
      grouped: true,
    });
  }

  @Get('/:itemId')
  getService(@GetCompany() business: BusinessEntity, @Param('itemId') itemId) {
    return this.itemService.getService(business.businessId, itemId);
  }

  @Get('/category/:categoryId')
  getCategoryService(
    @GetCompany() business: BusinessEntity,
    @Param('categoryId') categoryId
  ) {
    return this.itemService.getCategory(business.businessId, categoryId);
  }

  @Delete('/:itemId')
  async deleteService(
    @GetCompany() business: BusinessEntity,
    @Param('itemId') itemId,
    @GetPagination() paginate
  ) {
    return this.itemService.deleteService(business.businessId, itemId);
  }

  @Put()
  saveService(@GetCompany() business: BusinessEntity, @Body() service) {
    return this.itemService.saveService(business.businessId, service);
  }

  @Patch(':itemId')
  updateService(
    @GetCompany() business: BusinessEntity,
    @Param('itemId') itemId,
    @Body() service
  ) {
    return this.itemService.updateService(business.businessId, itemId, service);
  }

  @Put('/category')
  saveCategory(@GetCompany() business: BusinessEntity, @Body() category) {
    return this.itemService.saveServiceCategory(business.businessId, category);
  }

  @Patch('/category/:id')
  updateCategory(
    @GetCompany() business: BusinessEntity,
    @Param('id') id,
    @Body() category
  ) {
    return this.itemService.saveServiceCategory(business.businessId, category);
  }

  @Delete('category/:categoryId')
  async deleteCategory(
    @GetCompany() business: BusinessEntity,
    @Param('categoryId') categoryId
  ) {
    return this.itemService.deleteCategory(business.businessId, categoryId);
  }
}
