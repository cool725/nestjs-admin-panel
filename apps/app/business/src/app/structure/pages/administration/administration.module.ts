import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdministrationOverviewComponent } from './overview/administration-overview.component';
import { SettingUserAPI } from './user/packages/user-api.service';

const routes = [
  {
    path: 'overview',
    component: AdministrationOverviewComponent,
  },
  {
    path: 'user/role',
    loadChildren: () =>
      import('./user/sections/role/role.module').then(
        (m) => m.SettingsUserRoleModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/sections/user/user.module').then(
        (m) => m.AdministrationUserModule
      ),
  },
  {
    path: 'business',
    loadChildren: () =>
      import('./business/business.module').then((m) => m.BusinessModule),
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentModule),
  },
];

@NgModule({
  declarations: [AdministrationOverviewComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [SettingUserAPI],
})
export class AdministrationModule {}
