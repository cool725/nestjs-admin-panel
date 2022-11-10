import { Body, Controller, Get, UseGuards } from "@nestjs/common";
import { FrontOffice } from "../business.frontoffice.namespace";
import { AuthUserEntity, CompanyGuard, GetUser } from "@movit/api/auth";
import { AuthGuard } from "@nestjs/passport";
import { CashSystemDeviceService } from "@movit/api/models/cashsystem";
import { GetCompany } from "@movit/api/business";
import { CompanyEntity } from "@movit/api/business";
import { AccountService } from "@movit/api/finance/account";

@Controller(FrontOffice.resolePaths([FrontOffice.CashSystem.PATH]))
@UseGuards(AuthGuard(), CompanyGuard /*AppsRolesGuard(xx)*/)
export class BusinessFrontOfficeCashSystemController {
  constructor(
    protected accountService: AccountService,
    protected cashSystemDeviceService: CashSystemDeviceService
  ) {}

  @Get("healthcheck")
  healthCheck(@GetCompany() company: CompanyEntity, @GetUser() user: AuthUserEntity) {
    return company.companyId;
  }

  @Get("settings")
  getSettings(@GetCompany() company: CompanyEntity, @GetUser() user: AuthUserEntity) {
    return company.companyId;
  }

  @Get("accounts")
  getAccounts(@GetCompany() company: CompanyEntity, @GetUser() user: AuthUserEntity) {
    return this.accountService.getAccounts(company.companyId, {
      showInCashSystem: true,
      select: ["name", "accountId", "code"],
    });
  }

  @Get("cashout")
  cashout(
    @GetCompany() company: CompanyEntity,
    @GetUser() user: AuthUserEntity,
    @Body() body: any
  ) {
    /*
        const accDate            = req.getDate('sql');
        const request:ItemBasket = req.getDefaultParameter();
        const basket             = new ItemBasket();

        basket.INJECT.payments(request.payments);
        basket.INJECT.items(request.items);

         // Get Profile that has made Payment

        // 1. create recipt
        const BILLE = new   BillEngine(req.getCompany(),req.getDB());
        const bill  = await BILLE.createEmptyBill(invoice ? EBillType.invocie:EBillType.sell);
        bill.setGroupId(basket.billGroupId)

         // Link Items with values

    * */

    return body;
  }
}
