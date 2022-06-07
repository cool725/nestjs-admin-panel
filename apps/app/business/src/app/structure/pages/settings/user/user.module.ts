import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdbSharedModule } from '@movit/app/ui';

import { SettingsUserComponent } from './user.component';

const routes = [
  { path: 'overview', component: SettingsUserComponent }
];

@NgModule({
  declarations: [SettingsUserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MdbSharedModule,
  ],
})
export class SettingsUserModule { }