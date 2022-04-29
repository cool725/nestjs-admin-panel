import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileSagmentAPI } from './packages/profile-sagment-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { ProfilesSegmentOverviewComponent } from './overview/profiles-segment-overview.component';



@NgModule({
  declarations: [ProfilesSegmentOverviewComponent],
  imports: [
        CommonModule,
        RouterModule.forChild([
          // {
          //   path: 'new',
          //   component: ProfilesSagmentFormComponent,
          // },
          // {
          //   path: 'edit/:id',
          //   component: ProfilesSagmentFormComponent,
          // },
          {
            path: 'overview',
            component: ProfilesSegmentOverviewComponent,
          }
        ]),
        TranslateModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
        // ProfilesSagmentFormModule
    ],
  providers: [
    ProfileSagmentAPI,
    {
      provide: 'apiPath',
      useValue: [environment.api.url, 'frontoffice/crm'].join('/'),
    },
  ],
  entryComponents: [ProfilesSegmentOverviewComponent],
  exports: [],
})
export class ProfileSegmentModule {}


