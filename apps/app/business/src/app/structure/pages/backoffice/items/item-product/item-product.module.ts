import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbSharedModule } from '@movit/app/ui';
import { TranslateLocaleModule } from '@movit/app/module';
import { BoostrapModalUIModule } from 'libs/app/ui/vendors/boostrap/modal/default/modal.default.module';

import { ItemProductOverviewComponent } from './overview/item-product.overview.component';
import { ItemProductAPI } from './item-product.api';
import { ItemProductFormComponent } from './form/item-product-form.component';
import { PostageProductOverviewComponent } from './postage/postage-product.overview.component';
import { ItemServiceCategoryModule } from './form-category-service/item-category-service-form.module';

const routes: Routes = [
  {
    path: 'postage',
    component: PostageProductOverviewComponent,
  },
  {
    path: '**',
    component: ItemProductOverviewComponent,
  },
];

@NgModule({
  declarations: [
    ItemProductOverviewComponent,
    ItemProductFormComponent,
    PostageProductOverviewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule,
    RouterModule.forChild(routes),
    TranslateLocaleModule.forChild(),
    FormsModule,
    MdbSharedModule,
    BoostrapModalUIModule,
    ItemServiceCategoryModule
  ],
  providers: [ItemProductAPI],
})
export class ItemProductModule {}
