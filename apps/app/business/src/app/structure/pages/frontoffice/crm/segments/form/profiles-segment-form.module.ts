import { CommonModule } from '@angular/common';
import { NzAntSharedModule } from '@movit/app/ui';
import { ProfilesSegmentFormComponent } from './profiles-segment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { ProfileSegmentAPI } from '../packages/profile-sagment-api.service';
import { environment } from '../../../../../../../environments/environment';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { TranslateLocaleModule } from '@movit/app/module';

@NgModule({
  declarations: [ProfilesSegmentFormComponent],
  imports: [
    CommonModule,
    TranslateLocaleModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NzAntSharedModule,
    MdbFormsModule,
  ],
  providers: [
    ProfileSegmentAPI,
    {
      provide: 'apiPath',
      useValue: [environment.api.url, 'frontoffice/crm'].join('/'),
    },
  ],
  entryComponents: [ProfilesSegmentFormComponent],
  exports: [ProfilesSegmentFormComponent],
})
export class ProfilesSegmentFormModule {}
