import { CommonModule } from '@angular/common';
import { ProfilesPriceClassFormComponent } from './profiles-price-class-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { environment } from '../../../../../../../environments/environment';
import { ProfilePriceClassAPI } from '../packages/profile-price-class-api.service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';


@NgModule({
  declarations: [ProfilesPriceClassFormComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    MdbFormsModule

  ],
  providers: [
    ProfilePriceClassAPI,
    {
      provide: 'apiPath',
      useValue: [environment.api.url, 'frontoffice/crm'].join('/'),
    },
  ],
  entryComponents: [ProfilesPriceClassFormComponent],
  exports: [ProfilesPriceClassFormComponent],
})
export class ProfilesPriceClassFormModule {}
