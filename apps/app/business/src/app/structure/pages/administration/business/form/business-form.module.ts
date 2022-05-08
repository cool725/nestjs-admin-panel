import { CommonModule } from '@angular/common';
import { BusinessFormComponent } from './business-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [BusinessFormComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
  ],
  providers: [],
  entryComponents: [BusinessFormComponent],
  exports: [BusinessFormComponent],
})
export class BusinessFormModule {}
