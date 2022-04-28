import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesOverviewComponent } from './overview/profiles-overview.component';
import { RouterModule } from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {ProfilesAPI} from "./packages/profile-api.service";
import {FormsModule} from "@angular/forms";

const routes = [
    {
        path: 'new',
        component: EditProfileComponent
    },
    {
        path: 'edit/:id',
        component: ProfilesFormComponent
    },
   {
    path:'**',
    component:ProfilesOverviewComponent
  }
]

@NgModule({
  declarations: [
    ProfilesOverviewComponent,ProfilesFormComponent
  ],
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
            provide: 'apiPath',
            useValue: environment.api.url + '/frontoffice/crm',
        },
    ],
    entryComponents: [ProfilesFormComponent],
    exports: [ProfilesFormComponent],
})
export class ProfilesModule { }
