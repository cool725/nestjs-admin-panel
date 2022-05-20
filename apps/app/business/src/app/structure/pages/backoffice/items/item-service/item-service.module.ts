import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemServiceOverviewComponent } from './overview/item-service.overview.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BoostrapModalUIModule } from '../../../../../../../../../../libs/app/ui/boostrap/modal/default/modal.default.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ItemServiceAPI } from './item.api';
import { ItemServiceFormComponent } from './form-service/item-service-form.component';
import { MdbSharedModule } from '@movit/app/ui';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { TranslateLocaleModule } from '@movit/app/module';
import {ItemServiceCategoryModule} from "./form-category-service/item-category-service-form.module";
import {ItemServiceFormModule} from "./form-service/item-service-form.module";

const routes: Routes = [
  {
    path: 'new',
    component: ItemServiceFormComponent,
  },
  {
    path: 'edit/:itemId',
    component: ItemServiceFormComponent,
  },
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
  declarations: [ ItemServiceOverviewComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateLocaleModule.forChild(),
    BoostrapModalUIModule,
    MdbSharedModule,
    ItemServiceFormModule,
    ItemServiceCategoryModule,
    FormsModule
  ],
  providers: [
    {
      provide: 'basePath',
      useValue: '',
    },ItemServiceAPI],
})
export class ItemServiceModule {}
