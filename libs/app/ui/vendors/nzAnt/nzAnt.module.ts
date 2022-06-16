import { NgModule } from '@angular/core';
import { TranslateLocaleModule } from '@movit/app/module';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCustomEmptyComponent } from './components/custom-empty/nz-custom-empty.component';
import { MdbNzSelectDirective } from './directives/mdb.nz-select.directive';

@NgModule({
  declarations: [NzCustomEmptyComponent, MdbNzSelectDirective],
  imports: [NzEmptyModule, TranslateLocaleModule],
    exports: [NzSelectModule, NzUploadModule, MdbNzSelectDirective],
  providers: [
    {
      provide: NZ_CONFIG,
      useValue: {
        empty: {
          nzDefaultEmptyContent: NzCustomEmptyComponent
        }
      }
    }
  ]
})
export class NzAntSharedModule {}
