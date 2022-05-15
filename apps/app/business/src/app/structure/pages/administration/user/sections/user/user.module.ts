import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserNewComponent } from './new/user.new.component';
import { FormUserComponent } from './form/form-user.component';
import { MdbSharedModule } from '@movit/app/ui';

const routes = [
  { path: 'invite', component: UserNewComponent },
  { path: 'new', component: FormUserComponent },
  { path: 'edit/:userId', component: FormUserComponent },
  { path: 'overview', component: UserComponent },
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
