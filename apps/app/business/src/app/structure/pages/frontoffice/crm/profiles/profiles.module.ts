import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesOverviewComponent } from './overview/profiles-overview.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfilesAPI } from './packages/profile-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilesFormComponent } from './form/profiles-form.component';
import { environment } from '../../../../../../environments/environment';
import { ProfilesFormModule } from './form/profiles-form.module';

import { MdbSharedModule } from '@movit/app/ui';

import { TranslateLocaleModule } from '../../../../../../../../../../libs/app/common/module/translate/module.translate';

@NgModule({
  declarations: [ProfilesOverviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'new',
        component: ProfilesFormComponent,
      },
      {
        path: 'edit/:id',
        component: ProfilesFormComponent,
      },
      {
        path: 'overview',
        component: ProfilesOverviewComponent,
      },
    ]),
    TranslateLocaleModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    ProfilesFormModule,
    MdbSharedModule,
  ],
  providers: [
    ProfilesAPI,
    {
      provide: 'apiPath',
      useValue: [environment.api.url, 'frontoffice/crm'].join('/'),
    },
  ],
  entryComponents: [ProfilesFormComponent],
  exports: [ProfilesFormComponent],
})
export class ProfilesModule {}
