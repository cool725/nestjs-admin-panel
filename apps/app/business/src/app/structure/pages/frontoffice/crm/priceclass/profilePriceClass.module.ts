import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { BoostrapModalUIComponent, MdbSharedModule } from '@movit/app/ui';
import { BoostrapModalUIModule } from '../../../../../../../../../../libs/app/ui/vendors/boostrap/modal/default/modal.default.module';
import { ProfilesPriceClassOverviewComponent } from './overview/profiles-price-class-overview.component';
import { ProfilesPriceClassFormComponent } from './form/profiles-price-class-form.component';
import { ProfilePriceClassAPI } from './packages/profile-price-class-api.service';
import { ProfilesPriceClassFormModule } from './form/profiles-price-class-form.module';
import { TranslateLocaleModule } from '../../../../../../../../../../libs/app/common/module/translate/module.translate';

@NgModule({
  declarations: [ProfilesPriceClassOverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'new',
        component: ProfilesPriceClassFormComponent,
      },
      {
        path: 'edit/:id',
        component: ProfilesPriceClassFormComponent,
      },
      {
        path: 'overview',
        component: ProfilesPriceClassOverviewComponent,
      },
    ]),
    TranslateLocaleModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    BoostrapModalUIModule,
    ProfilesPriceClassFormModule,
    MdbSharedModule,
  ],
  providers: [
    ProfilePriceClassAPI,
    {
      provide: 'apiPath',
      useValue: [environment.api.url, 'frontoffice/crm'].join('/'),
    },
  ],
  entryComponents: [ProfilesPriceClassOverviewComponent],
  exports: [],
})
export class ProfilePriceClassModule {}
