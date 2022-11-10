import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 import { CashSystemItemsService } from './packages/services/cashsystem.service-items';
import { CashSystemPaymentService } from './packages/services/cashsystem.service-payment';
import { MainCashSystemComponent } from './main-cashsystem.component';
import { SharedCashSystemComponentsModule } from './components/shared-cashsystem-components.module';
import { TranslateLocaleModule } from '@movit/app/module';
import { MdbSharedModule } from "@movit/app/ui";
import { RouterModule, Routes } from '@angular/router';
import { CashSystemProfileService } from "./packages/services/cashsystem.service-profile";
import {CashSystemStore} from "./packages/services/cashsystem.store";
import {CashSystemService} from "./packages/services/cashsystem.service-api";

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
    CashSystemService,
    CashSystemPaymentService,
    CashSystemItemsService,
    CashSystemProfileService,
    CashSystemStore
  ],
})
export class CashSystemModule {}
