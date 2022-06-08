import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbSharedModule } from '@movit/app/ui';
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
    CashSystemSettingsComponent,
  ],
  imports: [CommonModule, MdbSharedModule, TranslateLocaleModule],
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
