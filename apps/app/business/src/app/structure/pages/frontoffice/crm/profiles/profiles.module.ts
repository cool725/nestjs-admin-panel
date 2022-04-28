import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesOverviewComponent } from './overview/profiles-overview.component';
import {RouterModule, Routes} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfilesAPI } from './packages/profile-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilesFormComponent } from './form/profiles-form.component';
import { environment } from '../../../../../../environments/environment';
import { ProfilesFormModule } from "./form/profiles-form.module";

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
          }
        ]),
        TranslateModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
        ProfilesFormModule
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


