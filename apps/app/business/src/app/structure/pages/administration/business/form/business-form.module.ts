import { CommonModule } from '@angular/common';
import { BusinessFormComponent } from './business-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TranslateLocaleModule } from '../../../../../../../../../../libs/app/common/module/translate/module.translate';

@NgModule({
  declarations: [BusinessFormComponent],
  imports: [
    CommonModule,
    TranslateLocaleModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
  ],
  providers: [],
  entryComponents: [BusinessFormComponent],
  exports: [BusinessFormComponent],
})
export class BusinessFormModule {}
