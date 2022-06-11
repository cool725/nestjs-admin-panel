import { CommonModule } from '@angular/common';
import { ProfilesFormComponent } from './profiles-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { ProfilesAPI } from '../packages/profile-api.service';
import { environment } from '../../../../../../../environments/environment';
import { MdbSharedModule, NzAntSharedModule } from '@movit/app/ui';
import { TranslateLocaleModule } from '@movit/app/module';

@NgModule({
  declarations: [ProfilesFormComponent],
  imports: [
    CommonModule,
    TranslateLocaleModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NzAntSharedModule,
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
export class ProfilesFormModule {}
