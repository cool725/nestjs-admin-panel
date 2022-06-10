import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { TranslateLocaleModule } from '@movit/app/module';

import { MdbNzSelectDirective } from './directives/mdb.nz-select.directive';
import { MdbPaginationModule } from "./components/pagination/mdb.pagination.module";

@NgModule({
  declarations: [MdbNzSelectDirective],
  imports: [CommonModule, TranslateLocaleModule],
  exports: [
    MdbRippleModule,
    MdbFormsModule,
    MdbTabsModule,
    MdbCheckboxModule,
    MdbNzSelectDirective,
    MdbPaginationModule,
    MdbDropdownModule
  ],
})
export class MdbSharedModule { }
