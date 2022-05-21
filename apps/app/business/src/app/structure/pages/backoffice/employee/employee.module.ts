import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from './form/form.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeOverviewComponent } from './overview/employee.component';
import { EmployeeApi } from './overview/employee.api.service';

import { MdbSharedModule } from '@movit/app/ui';
import { TranslateLocaleModule } from '@movit/app/module';

const routes: Routes = [
  {
    path: 'overview',
    component: EmployeeOverviewComponent,
  },
  {
    path: 'edit/:employeeId',
    component: EmployeeFormComponent,
  },
  {
    path: 'new',
    component: EmployeeFormComponent,
  },
  {
    path: '',
    redirectTo: 'overview',
  },
];

@NgModule({
  declarations: [EmployeeOverviewComponent, EmployeeFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateLocaleModule.forChild(),
    MdbSharedModule,
  ],
  providers: [EmployeeApi],
})
export class EmployeeModule {}
