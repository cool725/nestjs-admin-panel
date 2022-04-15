import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ItemProductOverviewComponent } from './overview/item-product.overview.component';
import { ItemProductAPI } from './item-product.api';
import { ItemProductFormComponent } from './form/item-product-form.component';

const routes: Routes = [
  {
    path: '**',
    component: ItemProductOverviewComponent,
  },
];

@NgModule({
  declarations: [ItemProductOverviewComponent, ItemProductFormComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [ItemProductAPI],
})
export class ItemProductModule {}
