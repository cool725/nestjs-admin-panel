import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesOverviewComponent } from './overview/profiles-overview.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { Route, RouterModule } from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {ProfilesAPI} from "./packages/profile-api.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ProfilesOverviewComponent
  },
  {
    path: 'new',
    component: EditProfileComponent
  },
  {
    path: 'edit/:id',
    component: EditProfileComponent
  }
]

@NgModule({
  declarations: [
    ProfilesOverviewComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
    ProfilesAPI
  ]
})
export class ProfilesModule { }
