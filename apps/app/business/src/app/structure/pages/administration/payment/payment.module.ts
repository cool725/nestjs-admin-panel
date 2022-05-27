import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { RouterModule } from '@angular/router';
import { TranslateLocaleModule } from '../../../../../../../../../libs/app/common/module/translate/module.translate';
import { MdbSharedModule } from '@movit/app/ui';
import { BoostrapModalUIModule } from '../../../../../../../../../libs/app/ui/vendors/boostrap/modal/default/modal.default.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes = [{ path: 'overview', component: PaymentComponent }];

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TranslateLocaleModule.forChild(),
    BoostrapModalUIModule,
    MdbSharedModule,
  ],
})
export class PaymentModule {}
