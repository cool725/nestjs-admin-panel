import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemServiceOverviewComponent } from './overview/item-service.overview.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MdbSharedModule } from '@movit/app/ui';

import { TranslateLocaleModule } from '@movit/app/module';
import { ItemServiceCategoryModule } from './form-category-service/item-category-service-form.module';
import { ItemServiceFormModule } from './form-service/item-service-form.module';
import { BoostrapModalUIModule } from '../../../../../../../../../../libs/app/ui/vendors/boostrap/modal/default/modal.default.module';

const routes: Routes = [
  {
    path: 'overview',
    component: ItemServiceOverviewComponent,
  },
  {
    path: '',
    redirectTo: 'overview',
  },
];

@NgModule({
  declarations: [ItemServiceOverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateLocaleModule.forChild(),
    FormsModule,
    MdbSharedModule,
    ItemServiceFormModule,
    ItemServiceCategoryModule,
    BoostrapModalUIModule,
  ],
  providers: [],
})
export class ItemServiceModule {}
