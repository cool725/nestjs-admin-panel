import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { RouterModule } from '@angular/router';

const routes = [{ path: 'overview', component: PaymentComponent }];

@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PaymentModule {}
