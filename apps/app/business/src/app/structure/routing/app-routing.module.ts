import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthCanActivate } from '@movit/app/common';

const routes: Routes = [
  {
    path: ':businessUuid/:locationId',
    loadChildren: () =>
      import('./../../layout/main/layout-main.module').then(
        (m) => m.LayoutMainModule
      ),
    canActivate: [
      AuthCanActivate.hasUserAccess,
      AuthCanActivate.hasCompanyAccess,
    ],
  },
  {
    path: '',
    loadChildren: () =>
      import('./../../layout/main/layout-main.module').then(
        (m) => m.LayoutMainModule
      ),
    canActivate: [
      AuthCanActivate.hasUserAccess,
      AuthCanActivate.hasCompanyAccess,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthCanActivate.hasUserAccess, AuthCanActivate.hasCompanyAccess],
})
export class AppRoutingModule {}
