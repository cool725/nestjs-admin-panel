import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemServiceOverviewComponent } from './overview/item-service.overview.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BoostrapModalUIModule } from '../../../../../../../../../../libs/app/ui/boostrap/modal/default/modal.default.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ItemServiceAPI } from './item.api';
import { ItemServiceFormComponent } from './form/item-service-form.component';
import { MdbSharedModule } from '@movit/app/ui';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLocaleModule } from '../../../../../../../../../../libs/app/common/module/translate/module.translate';

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
  declarations: [ItemServiceOverviewComponent, ItemServiceFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    BoostrapModalUIModule,
    NzSelectModule,
    TranslateLocaleModule.forChild(),
    MdbSharedModule,
  ],
  providers: [ItemServiceAPI],
})
export class ItemServiceModule {}
