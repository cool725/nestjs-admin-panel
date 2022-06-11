import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { TranslateLocaleModule } from '@movit/app/module';
import { MdbPaginationModule } from "./components/pagination/mdb.pagination.module";


@NgModule({
  imports: [CommonModule, TranslateLocaleModule],
  exports: [
    MdbRippleModule,
    MdbFormsModule,
    MdbTabsModule,
    MdbCheckboxModule,
    MdbPaginationModule
  ],
})
export class MdbSharedModule {}
