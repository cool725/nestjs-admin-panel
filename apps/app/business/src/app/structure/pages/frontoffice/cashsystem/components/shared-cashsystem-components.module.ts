import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbSharedModule, NzAntSharedModule } from "@movit/app/ui";
import { TranslateLocaleModule } from '@movit/app/module';
import { CashSystemAccountChooserComponent } from './account-chooser/account-chooser.component';
import { CashSystemBasketComponent } from './basket/basket.component';
import { CashSystemCalculatorComponent } from './calculator/calculator.component';
import { CashSystemReceiptComponent } from './receipt/receipt.component';
import { CashSystemServicesComponent } from './services/services.component';
import { CashSystemSettingsComponent } from './settings/settings.component';
import { CashSystemBasketFooterComponent } from './basket/footer/basket-footer.component';
import { CashSystemBasketHeaderComponent } from './basket/header/basket-header.component';
import { CashSystemBasketItemLineComponent } from './basket/item-line/basket-item-line.component';
import { CashSystemServicesItemComponent } from "./services/cash-service-item/cash-service-item.component";

import { ToFixedPipe} from "@movit/app/common";
import { FormsModule } from "@angular/forms";
import {CashSystemServicesRowComponent} from "./services/cash-service-row/cash-service-row.component";

@NgModule({
  declarations: [
    CashSystemAccountChooserComponent,
    CashSystemBasketComponent,
    CashSystemBasketFooterComponent,
    CashSystemBasketHeaderComponent,
    CashSystemBasketItemLineComponent,
    CashSystemCalculatorComponent,
    CashSystemReceiptComponent,
    CashSystemServicesComponent,
    CashSystemServicesRowComponent,
    CashSystemServicesItemComponent,
    CashSystemSettingsComponent,
    ToFixedPipe
  ],
  imports: [CommonModule, MdbSharedModule, TranslateLocaleModule.forChild(), FormsModule, NzAntSharedModule],
  exports: [
    CashSystemAccountChooserComponent,
    CashSystemBasketComponent,
    CashSystemCalculatorComponent,
    CashSystemReceiptComponent,
    CashSystemServicesComponent,
    CashSystemSettingsComponent,
  ],
})
export class SharedCashSystemComponentsModule {}
