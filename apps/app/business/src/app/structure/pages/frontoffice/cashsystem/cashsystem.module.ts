import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashSystemSettingsService } from "./packages/services/cashsystem.service-settings";
import { CashSystemItemsService } from "./packages/services/cashsystem.service-items";
import { CashSystemPaymentService } from "./packages/services/cashsystem.service-payment";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers:[
    CashSystemPaymentService,
    CashSystemItemsService,
    CashSystemSettingsService,
  ]
})
export class CashSystemModule {}
