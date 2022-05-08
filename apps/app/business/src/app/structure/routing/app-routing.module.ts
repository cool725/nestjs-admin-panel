import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCanActivate } from '@movit/app/common';
import { LayoutMainComponent } from '../../layout/main/layout-main.component';
import { LayoutMainModule } from '../../layout/main/layout-main.module';
import { SettingsModule } from '../pages/settings/settings.module';

const childRoutes = [
  {
    path: 'frontoffice',
    loadChildren: () =>
      import('./../../structure/pages/frontoffice/front-office.module').then(
        (m) => m.FrontOfficeModule
      ),
  },
  {
    path: 'backoffice',
    loadChildren: () =>
      import('./../../structure/pages/backoffice/back-office.module').then(
        (m) => m.BackOfficeModule
      ),
  },
  {
    path: 'finances',
    loadChildren: () =>
      import('./../../structure/pages/finances/finances.module').then(
        (m) => m.FinancesModule
      ),
  },
  {
    path: 'administration',
    loadChildren: () =>
      import('../pages/administration/administration.module').then(
        (m) => m.AdministrationModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('../pages/settings/settings.module').then((m) => m.SettingsModule),
  },
];

const routes: Routes = [
  {
    path: ':businessUuid/:locationId',
    children: childRoutes,
    canActivate: [
      AuthCanActivate.hasUserAccess,
      AuthCanActivate.hasCompanyAccess,
    ],
    component: LayoutMainComponent,
  },
  {
    path: '',
    children: childRoutes,
    canActivate: [
      AuthCanActivate.hasUserAccess,
      AuthCanActivate.hasCompanyAccess,
    ],
    component: LayoutMainComponent,
  },
];

@NgModule({
  imports: [LayoutMainModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthCanActivate.hasUserAccess, AuthCanActivate.hasCompanyAccess],
})
export class AppRoutingModule {}
