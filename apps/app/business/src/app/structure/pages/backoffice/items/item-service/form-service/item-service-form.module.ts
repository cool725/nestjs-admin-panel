import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbSharedModule, NzAntSharedModule } from '@movit/app/ui';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { TranslateLocaleModule } from '@movit/app/module';
import { ItemServiceAPI } from '../item.api';
import { ItemServiceFormComponent } from './item-service-form.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { environment } from '../../../../../../../environments/environment';

const baseAPIPath = [environment.api.url, 'backoffice', 'sales', 'items'].join(
  '/'
);

@NgModule({
  declarations: [ItemServiceFormComponent],
  imports: [
    CommonModule,
    TranslateLocaleModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    MdbSharedModule,
  ],
  providers: [],
  entryComponents: [ItemServiceFormComponent],
  exports: [ItemServiceFormComponent],
})
export class ItemServiceFormModule {}
