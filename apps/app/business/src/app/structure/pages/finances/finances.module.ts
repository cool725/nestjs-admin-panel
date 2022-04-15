import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const canActivateRoutes: [] = [];

const routes: Routes = [
  {
    path: 'external',
    loadChildren: () =>
      import('./external-accounting/finances-external-accounting.module').then(
        (m) => m.FinancesExternalAccountingModule
      ),
    canActivate: canActivateRoutes,
  },
  {
    path: 'interal',
    loadChildren: () =>
      import('./internal-accounting/finances-internal-accounting.module').then(
        (m) => m.FinancesInternalAccountingModule
      ),
    canActivate: canActivateRoutes,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class FinancesModule {}
