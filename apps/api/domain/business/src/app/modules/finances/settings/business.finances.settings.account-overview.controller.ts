import {
  Body,
  Controller,
  Get, HttpException, HttpStatus,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import {Finances} from '../business.finances.namespace';

import { AuthUserEntity, CompanyGuard, GetUser } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import { AppsRolesGuard } from 'libs/api/models/auth/apps-role/src/guards/auth.guards.apps';
import {AccountService} from "@movit/api/finance/account";
import {GetCompany, ICompany} from "@movit/api/business";

@Controller(Finances.resolePaths([Finances.Settings.PATH]))
@UseGuards(AuthGuard(), CompanyGuard ,AppsRolesGuard(29))
export class BusinessFinancesSettingsAccountOverviewController {

  constructor(private accountService:AccountService) {
  }

  @Get('accounts')
  getAccounts(
      @GetCompany() company:ICompany
  ){
    return this.accountService.getAccounts(company.companyId,{})
  }

}
