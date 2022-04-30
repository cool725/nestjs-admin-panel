import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileSegmentAPI } from './packages/profile-sagment-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { ProfilesSegmentOverviewComponent } from './overview/profiles-segment-overview.component';
import {BoostrapModalUIComponent} from "@movit/app/ui";
import {
    BoostrapModalUIModule
} from "../../../../../../../../../../libs/app/ui/boostrap/modal/default/modal.default.module";
import {ProfilesSegmentFormModule} from "./form/profiles-segment-form.module";



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
         BoostrapModalUIModule,
        ProfilesSegmentFormModule

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


