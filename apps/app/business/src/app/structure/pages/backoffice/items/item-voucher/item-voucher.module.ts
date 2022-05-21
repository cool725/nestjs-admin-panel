import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ItemVoucherOverviewComponent } from './overview/item-voucher.overview.component';
import { ItemVoucherApi } from './item-voucher.api';

const routes: Routes = [
  {
    path: '**',
    component: ItemVoucherOverviewComponent,
  },
];

@NgModule({
  declarations: [ItemVoucherOverviewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [ItemVoucherApi],
})
export class ItemVoucherModule {}
