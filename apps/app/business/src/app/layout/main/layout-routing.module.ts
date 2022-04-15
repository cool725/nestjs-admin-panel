import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMainComponent } from './layout-main.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutMainComponent,
    children: [
      {
        path: 'frontoffice',
        loadChildren: () =>
          import(
            './../../structure/pages/frontoffice/front-office.module'
          ).then((m) => m.FrontOfficeModule),
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
        path: 'settings',
        loadChildren: () =>
          import('./../../structure/pages/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
