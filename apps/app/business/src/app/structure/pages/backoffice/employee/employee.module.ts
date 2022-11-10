import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLocaleModule } from '@movit/app/module';
import {MdbSharedModule, NzAntSharedModule} from '@movit/app/ui';
import {
    BoostrapModalUIModule
} from "../../../../../../../../../libs/app/ui/vendors/boostrap/modal/default/modal.default.module";
import {EmployeeFormComponent} from './form/employee-form.component';
import {EmployeeApi} from './overview/employee.api.service';
import {EmployeeOverviewComponent} from './overview/employee.component';

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
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        TranslateLocaleModule.forChild(),
        MdbSharedModule,
        NzAntSharedModule,
        BoostrapModalUIModule,
    ],
    providers: [EmployeeApi],
})
export class EmployeeModule {}
