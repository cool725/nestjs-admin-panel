import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdbPaginationComponent } from './pagination.component';
import {TranslateLocaleModule} from "@movit/app/module";

@NgModule({
  declarations: [ MdbPaginationComponent],
  imports: [CommonModule,TranslateLocaleModule.forChild()],
  exports: [
    MdbPaginationComponent,
  ],
})
export class MdbPaginationModule {}
