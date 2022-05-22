import { NgModule } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbNzSelectDirective } from './directives/mdb.nz-select.directive';
import {MdbCheckboxModule} from "mdb-angular-ui-kit/checkbox";

@NgModule({
  declarations: [MdbNzSelectDirective],
  imports: [],
  exports: [
    MdbRippleModule,
    MdbFormsModule,
    MdbTabsModule,
    MdbCheckboxModule,
    MdbNzSelectDirective,
  ],
})
export class MdbSharedModule {}
