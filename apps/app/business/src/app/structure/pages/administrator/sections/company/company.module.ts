import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsOverviewComponent } from './settings-overview/settings-overview.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'overview',
    component: SettingsOverviewComponent,
  },
];

@NgModule({
  declarations: [SettingsOverviewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SettingsCompanyModule {}
