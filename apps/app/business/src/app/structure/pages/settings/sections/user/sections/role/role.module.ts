import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RoleFormComponent } from './form/role.form.component';
import { SettingRoleAPI } from '../../packages/apps-api.service';

const routes = [
  { path: 'new', component: RoleFormComponent },
  { path: 'edit/:id', component: RoleFormComponent },
  { path: '', component: RoleComponent },
];

@NgModule({
  declarations: [RoleComponent, RoleFormComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  providers: [SettingRoleAPI],
})
export class SettingsUserRoleModule {}
