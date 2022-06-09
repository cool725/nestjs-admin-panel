import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CashSystemSettingsService } from './packages/services/cashsystem.service-settings';
import { CashSystemItemsService } from './packages/services/cashsystem.service-items';
import { CashSystemPaymentService } from './packages/services/cashsystem.service-payment';
import { MainCashSystemComponent } from './main-cashsystem.component';
import { SharedCashSystemComponentsModule } from './components/shared-cashsystem-components.module';
import { TranslateLocaleModule } from '@movit/app/module';
import { MdbSharedModule, NzAntSharedModule } from "@movit/app/ui";
import { RouterModule, Routes } from '@angular/router';
import { CashSystemProfileService } from "./packages/services/cashsystem.service-profile";

const routes: Routes = [
  {
    path: '',
    component: MainCashSystemComponent,
  },
  {
    path: '**',
    component: MainCashSystemComponent,
  },
];
@NgModule({
  declarations: [MainCashSystemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateLocaleModule.forChild(),
    MdbSharedModule,
    SharedCashSystemComponentsModule,
  ],
  providers: [
    CashSystemPaymentService,
    CashSystemItemsService,
    CashSystemSettingsService,
    CashSystemProfileService
  ],
})
export class CashSystemModule {}
