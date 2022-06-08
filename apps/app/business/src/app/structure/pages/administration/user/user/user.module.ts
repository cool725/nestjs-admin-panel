import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserNewComponent } from './new/user.new.component';
import { FormUserComponent } from './form/form-user.component';
import { MdbSharedModule } from '@movit/app/ui';
import { UserComponent } from "./overview/user.component";

const routes = [
  { path: 'invite', component: UserNewComponent },
  { path: 'new', component: FormUserComponent },
  { path: 'edit/:userId', component: FormUserComponent },
  { path: 'overview', component: UserComponent },
  {
    path: 'onboarding',
    loadChildren: () =>
      import('./onboarding/user.onboarding.module').then(
        (m) => m.UseBoardingModule
      ),
  },
];

@NgModule({
  declarations: [UserComponent, UserNewComponent, FormUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MdbSharedModule,
  ],
})
export class AdministrationUserModule {}
