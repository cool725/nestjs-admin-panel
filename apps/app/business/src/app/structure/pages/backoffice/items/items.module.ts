import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../../../environments/environment';

const routes: Routes = [
  {
    path: 'sales',
    children: [
      {
        path: 'product',
        loadChildren: () =>
          import('./item-product/item-product.module').then(
            (m) => m.ItemProductModule
          ),
      },
      {
        path: 'service',
        loadChildren: () =>
          import('./item-service/item-service.module').then(
            (m) => m.ItemServiceModule
          ),
      },
      {
        path: 'collection',
        loadChildren: () =>
          import('./item-collection/item-collection.module').then(
            (m) => m.ItemCollectionModule
          ),
      },
      {
        path: 'voucher',
        loadChildren: () =>
          import('./item-voucher/item-voucher.module').then(
            (m) => m.ItemVoucherModule
          ),
      },
    ],
  },
];
const baseAPIPath = [environment.api.url, 'backoffice', 'sales', 'items'].join(
  '/'
);

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [
    {
      provide: 'basePath',
      useValue: baseAPIPath,
    },
  ],
})
export class ItemsModule {}
