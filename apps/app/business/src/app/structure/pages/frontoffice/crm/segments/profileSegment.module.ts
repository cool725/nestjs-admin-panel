import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfileSegmentAPI } from './packages/profile-sagment-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { ProfilesSegmentOverviewComponent } from './overview/profiles-segment-overview.component';

import { BoostrapModalUIModule } from '../../../../../../../../../../libs/app/ui/vendors/boostrap/modal/default/modal.default.module';
import { ProfilesSegmentFormModule } from './form/profiles-segment-form.module';
import { ProfilesSegmentFormComponent } from './form/profiles-segment-form.component';
import { MdbSharedModule } from '@movit/app/ui';
import { TranslateLocaleModule } from '../../../../../../../../../../libs/app/common/module/translate/module.translate';

@NgModule({
  declarations: [ProfilesSegmentOverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'new',
        component: ProfilesSegmentFormComponent,
      },
      {
        path: 'edit/:id',
        component: ProfilesSegmentFormComponent,
      },
      {
        path: 'overview',
        component: ProfilesSegmentOverviewComponent,
      },
    ]),
    TranslateLocaleModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    BoostrapModalUIModule,
    ProfilesSegmentFormModule,
    MdbSharedModule,
  ],
  providers: [
    ProfileSegmentAPI,
    {
      provide: 'apiPath',
      useValue: [environment.api.url, 'frontoffice/crm'].join('/'),
    },
  ],
  entryComponents: [ProfilesSegmentOverviewComponent],
  exports: [],
})
export class ProfileSegmentModule {}
