import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdbSharedModule, NzAntSharedModule } from '@movit/app/ui';
import { TranslateLocaleModule } from '@movit/app/module';
import { ItemServiceFormComponent } from './item-service-form.component';
import {NzTableModule} from "ng-zorro-antd/table";

@NgModule({
  declarations: [ItemServiceFormComponent],
    imports: [
        CommonModule,
        TranslateLocaleModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
        NzAntSharedModule,
        MdbSharedModule,
    ],
  providers: [],
  entryComponents: [ItemServiceFormComponent],
  exports: [ItemServiceFormComponent],
})
export class ItemServiceFormModule {}
