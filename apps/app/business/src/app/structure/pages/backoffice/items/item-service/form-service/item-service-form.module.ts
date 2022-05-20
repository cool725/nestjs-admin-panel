import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbSharedModule, NzAntSharedModule } from '@movit/app/ui';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import {TranslateLocaleModule} from "@movit/app/module";
import {ItemServiceCategoryModule} from "../form-category-service/item-category-service-form.module";
import {ItemServiceAPI} from "../item.api";
import {ItemServiceFormComponent} from "./item-service-form.component";


@NgModule({
  declarations: [ ItemServiceFormComponent  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateLocaleModule.forChild(),
    NzAntSharedModule,
    MdbSharedModule,
    MdbFormsModule,
  ],
  providers: [
    ItemServiceAPI,
    {
      provide: 'basePath',
      useValue:'',
    },
  ],
})
export class ItemServiceFormModule {}
