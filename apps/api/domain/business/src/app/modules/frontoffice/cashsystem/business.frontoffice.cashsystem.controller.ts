import { Controller, Get, UseGuards } from '@nestjs/common';
import {FrontOffice} from '../business.frontoffice.namespace';
import {AuthUserEntity, CompanyGuard, GetUser} from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import {CashSystemDeviceService} from "@movit/api/models/cashsystem";
import {GetCompany} from "@movit/api/business";
import {CompanyEntity} from "../../../../../../../../../libs/api/models/company/src/entities/companyEntity";
import {GetPagination, Pagination} from "../../../../../../../../../libs/api/common/decorator";

@Controller(FrontOffice.resolePaths([FrontOffice.CashSystem.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontofficeCashSystemSettingsController {
  constructor(
    protected cashSystemDeviceService: CashSystemDeviceService,
  ) {}



}
