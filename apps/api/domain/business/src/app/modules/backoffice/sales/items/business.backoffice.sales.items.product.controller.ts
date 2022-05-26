import { Controller, Get, UseGuards } from '@nestjs/common';
import { BackOffice } from '../../business.backoffice.namespace';
import { AuthGuard } from '@nestjs/passport';
import { CompanyGuard } from '@movit/api/auth';

@Controller(BackOffice.resolePath(BackOffice.Sales.Items.PATHProduct))
@UseGuards(AuthGuard(), CompanyGuard)
export class BusinessBackOfficeSalesItemsProductController {
  @Get('alive')
  getData() {
    return 1;
  }
}
