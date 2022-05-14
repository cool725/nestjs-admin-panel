import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LocaleResolver} from "../../routing/app-routing.resolver";

const routes:Routes = [
  {
    path: 'agenda',
    loadChildren: () =>
      import('./agenda/agenda.module').then((m) => m.AgendaModule),
    resolve:  LocaleResolver.default
  },
  {
    path: 'crm',
    loadChildren: () => import('./crm/crm.module').then((m) => m.CrmModule),
    resolve: LocaleResolver.default,
    data:{
      test:1
    }
  },
  {
    path: 'cashsystem',
    loadChildren: () =>
      import('./cashsystem/cashsystem.module').then((m) => m.CashsystemModule),
    resolve:  LocaleResolver.default
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers:[LocaleResolver]
})
export class FrontOfficeModule {}
