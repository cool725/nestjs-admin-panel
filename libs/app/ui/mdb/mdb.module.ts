import { NgModule } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbNzSelectDirective } from "./directives/mdb.nz-select.directive";

@NgModule({
  declarations: [
    MdbNzSelectDirective
  ],
  imports: [],
  exports: [

    MdbRippleModule, MdbFormsModule, MdbTabsModule, MdbNzSelectDirective]
})
export class MdbSharedModule {}
