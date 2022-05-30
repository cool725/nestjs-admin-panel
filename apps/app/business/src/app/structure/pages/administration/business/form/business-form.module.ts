import { CommonModule } from '@angular/common';
import { BusinessFormComponent } from './business-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TranslateLocaleModule } from '@movit/app/module';

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
