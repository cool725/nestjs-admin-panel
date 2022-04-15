import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SettingsOverviewComponent } from './overview/settings-overview.component';
import { SettingUserAPI } from './sections/user/packages/user-api.service';
import { OverviewComponent } from './sections/user/overview/overview.component';

const routes = [
  {
    path: 'overview',
    component: SettingsOverviewComponent,
  },
  {
    path: 'user/role',
    loadChildren: () =>
      import('./sections/user/sections/role/role.module').then(
        (m) => m.SettingsUserRoleModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./sections/user/sections/user/user.module').then(
        (m) => m.SettingsUserModule
      ),
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./sections/company/company.module').then(
        (m) => m.SettingsCompanyModule
      ),
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./sections/payment/payment.module').then((m) => m.PaymentModule),
  },
];

@NgModule({
  declarations: [SettingsOverviewComponent, OverviewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [SettingUserAPI],
})
export class SettingsModule {}
