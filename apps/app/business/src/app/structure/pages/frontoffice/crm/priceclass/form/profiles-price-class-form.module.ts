import { CommonModule } from '@angular/common';
import { NzAntSharedModule } from '@movit/app/ui';
import { ProfilesPriceClassFormComponent } from './profiles-price-class-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { ProfilePriceClassAPI } from '../packages/profile-price-class-api.service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { TranslateLocaleModule } from '@movit/app/module';

@NgModule({
  declarations: [ProfilesPriceClassFormComponent],
  imports: [
    CommonModule,
    TranslateLocaleModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NzAntSharedModule,
    MdbFormsModule,
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
