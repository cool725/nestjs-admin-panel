import { CommonModule } from '@angular/common';
import { NzAntSharedModule } from '@movit/app/ui';
import { BusinessFormComponent } from './business-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateLocaleModule } from '@movit/app/module';

@NgModule({
  declarations: [BusinessFormComponent],
  imports: [
    CommonModule,
    TranslateLocaleModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NzAntSharedModule,
  ],
  providers: [],
  entryComponents: [BusinessFormComponent],
  exports: [BusinessFormComponent],
})
export class BusinessFormModule {}
