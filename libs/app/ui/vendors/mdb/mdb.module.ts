import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbNzSelectDirective } from './directives/mdb.nz-select.directive';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbPaginationComponent } from './components/pagination/pagination.component';
import { TranslateLocaleModule } from '@movit/app/module';

@NgModule({
  declarations: [MdbNzSelectDirective, MdbPaginationComponent],
  imports: [CommonModule, TranslateLocaleModule],
  exports: [
    MdbRippleModule,
    MdbFormsModule,
    MdbTabsModule,
    MdbCheckboxModule,
    MdbNzSelectDirective,
    MdbPaginationComponent,
  ],
})
export class MdbSharedModule {}
