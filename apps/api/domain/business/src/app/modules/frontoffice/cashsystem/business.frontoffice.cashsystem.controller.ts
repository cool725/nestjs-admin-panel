import { Controller, UseGuards } from '@nestjs/common';
import { FrontOffice } from '../business.frontoffice.namespace';
import { CompanyGuard } from '@movit/api/auth';
import { AuthGuard } from '@nestjs/passport';
import { CashSystemDeviceService } from "@movit/api/models/cashsystem";

@Controller(FrontOffice.resolePaths([FrontOffice.CashSystem.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontofficeCashSystemController {
  constructor(
    protected cashSystemDeviceService: CashSystemDeviceService,
  ) { }
}
