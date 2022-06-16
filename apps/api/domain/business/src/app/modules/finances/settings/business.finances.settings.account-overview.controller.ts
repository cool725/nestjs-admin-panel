import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { Finances } from '../business.finances.namespace';

import { AuthUserEntity, CompanyGuard, GetUser } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import { AppsRolesGuard } from 'libs/api/models/auth/apps-role/src/guards/auth.guards.apps';
import { AccountService } from '@movit/api/finance/account';
import { GetCompany, ICompany } from '@movit/api/business';

@Controller(Finances.resolePaths([Finances.Settings.PATHAccounts]))
@UseGuards(AuthGuard(), CompanyGuard, AppsRolesGuard(29))
export class BusinessFinancesSettingsAccountOverviewController {
  constructor(private accountService: AccountService) {}

  @Get('')
  async getAccounts(@GetCompany() company: ICompany) {
    const accounts = await this.accountService.getAccounts(company.companyId, {
      // relations:['category']
    });
    return accounts.map((v) => {
      if (+v.companyId == 0) delete v.companyId;
      return v;
    });
  }

  @Patch(':accountId')
  async updateAccount(
    @Param('accountId') accountId: number,
    @GetCompany() company: ICompany,
    @Body() account: any
  ) {
    let acc = await this.accountService.getAccount(
      company.companyId,
      accountId
    );
    if (!acc)
      acc = await this.accountService.createCompanyAccount(
        company.companyId,
        accountId
      );

    // update infos
    acc.showInCashSystem = account.showInCashSystem;
    acc.code = account.code;
    acc.isActive = account.isActive;
    acc.save();
    return account;
  }
}
