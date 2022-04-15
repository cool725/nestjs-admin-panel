import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeOverviewComponent } from './employee.component';
import { EmployeeApi } from './employee.api.service';
import { TranslatePipeModule } from '@movit/app/common';

const routes: Routes = [
  {
    path: 'overview',
    component: EmployeeOverviewComponent,
  },
  {
    path: '',
    redirectTo: 'overview',
  },
];

@NgModule({
  declarations: [EmployeeOverviewComponent, FormComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TranslatePipeModule],
  providers: [EmployeeApi],
})
export class EmployeeModule {}
