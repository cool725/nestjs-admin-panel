import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesOverviewComponent } from './overview/profiles-overview.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfilesAPI } from './packages/profile-api.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfilesFormComponent } from './form/profiles-form.component';
import {environment} from "../../../../../../environments/environment";

const routes = [
  {
    path: '**',
    component: ProfilesOverviewComponent,
  },
];

@NgModule({
  declarations: [ProfilesOverviewComponent, ProfilesFormComponent],
  imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslateModule.forChild(),
        FormsModule,
        ReactiveFormsModule,
    ],
  providers: [
      ProfilesAPI,
      {
      provide:'apiPath',
      useValue: environment.api.url + '/frontoffice/crm',
    }
    ],
  entryComponents:[
    ProfilesFormComponent
  ],
  exports:[
    ProfilesFormComponent
  ]
})
export class ProfilesModule {}
