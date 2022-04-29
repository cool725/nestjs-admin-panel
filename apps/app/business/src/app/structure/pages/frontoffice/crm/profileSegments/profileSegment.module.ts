import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileSagmentAPI } from './packages/profile-sagment-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { ProfilesSagmentOverviewComponent } from './overview/profiles-sagment-overview.component';



@NgModule({
  declarations: [ProfilesSagmentOverviewComponent],
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
            component: ProfilesSagmentOverviewComponent,
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
  entryComponents: [ProfilesSagmentOverviewComponent],
  exports: [],
})
export class ProfileSegmentModule {}


